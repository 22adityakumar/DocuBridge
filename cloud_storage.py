import os
import uuid
import logging
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv

# Load environment variables from .env file (supports standalone script usage)
load_dotenv()

logger = logging.getLogger(__name__)

class CloudStorage:
    """
    Handles AWS S3 interactions: uploading local files, generating unique filenames,
    constructing public S3 URLs, and deleting local copies upon completion.
    """
    def __init__(self):
        # Retrieve credentials from environment
        self.aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID")
        self.aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
        self.bucket_name = os.getenv("AWS_S3_BUCKET")
        self.region_name = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
        
        # Check if credentials are placeholders or empty to run in Local Mock Mode
        self.is_mock_mode = (
            not self.aws_access_key_id or 
            self.aws_access_key_id.startswith("your-") or
            not self.aws_secret_access_key or
            self.aws_secret_access_key.startswith("your-") or
            not self.bucket_name or
            self.bucket_name.startswith("your-")
        )
        
        if self.is_mock_mode:
            logger.warning("AWS S3 Credentials are not configured or are set to placeholder values. "
                           "Running in Local Mock Mode (saving files to local static/uploads/ directory).")
            self.s3_client = None
        else:
            # Instantiate boto3 client
            self.s3_client = boto3.client(
                "s3",
                aws_access_key_id=self.aws_access_key_id,
                aws_secret_access_key=self.aws_secret_access_key,
                region_name=self.region_name
            )

    def generate_unique_key(self, original_filename):
        """
        Generates a unique S3 object key prefixing a UUID to avoid collisions.
        """
        base_name = os.path.basename(original_filename)
        unique_id = uuid.uuid4().hex
        return f"documents/{unique_id}_{base_name}"

    def upload_document(self, local_file_path, original_filename):
        """
        Uploads a local document to AWS S3 (or saves locally in Mock Mode),
        deletes the local temporary copy, and returns the public S3 URL and Key.
        """
        if not os.path.exists(local_file_path):
            raise FileNotFoundError(f"Local file not found: {local_file_path}")

        if self.is_mock_mode:
            try:
                # Save locally under static/uploads/
                static_upload_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static', 'uploads')
                os.makedirs(static_upload_dir, exist_ok=True)
                
                unique_id = uuid.uuid4().hex
                mock_filename = f"{unique_id}_{os.path.basename(original_filename)}"
                dest_path = os.path.join(static_upload_dir, mock_filename)
                
                import shutil
                shutil.copy2(local_file_path, dest_path)
                logger.info(f"[Mock Mode] Successfully stored file locally at {dest_path}")
                
                # Clean up local temporary file
                self._delete_local_file(local_file_path)
                
                s3_url = f"/static/uploads/{mock_filename}"
                s3_key = f"mock/{mock_filename}"
                return s3_url, s3_key
            except Exception as e:
                logger.error(f"[Mock Mode] Failed to write local copy: {e}")
                raise e

        if not self.bucket_name:
            raise ValueError("AWS_S3_BUCKET environment variable is not set.")

        # Generate unique key for S3
        s3_key = self.generate_unique_key(original_filename)

        try:
            logger.info(f"Initiating S3 upload for {local_file_path} to key {s3_key} in bucket {self.bucket_name}")
            
            # Perform S3 Upload
            self.s3_client.upload_file(
                Filename=local_file_path,
                Bucket=self.bucket_name,
                Key=s3_key,
                ExtraArgs={'ContentType': self._get_content_type(local_file_path)}
            )
            
            # Construct standard S3 Object URL
            s3_url = f"https://{self.bucket_name}.s3.{self.region_name}.amazonaws.com/{s3_key}"
            logger.info(f"S3 upload successful. URL: {s3_url}")
            
            # Delete local file after successful upload
            self._delete_local_file(local_file_path)
            
            return s3_url, s3_key

        except ClientError as e:
            logger.error(f"AWS S3 Client Error during upload: {e}")
            raise e
        except Exception as e:
            logger.error(f"Unexpected error during S3 upload: {e}")
            raise e

    def _delete_local_file(self, file_path):
        """Helper to remove local file after a successful upload."""
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"Deleted local temporary file: {file_path}")
        except OSError as e:
            logger.warning(f"Failed to delete local file {file_path}: {e}")

    def _get_content_type(self, file_path):
        """Determines content type by extension for S3 metadata."""
        ext = os.path.splitext(file_path)[1].lower()
        if ext == '.pdf':
            return 'application/pdf'
        elif ext in ['.jpg', '.jpeg']:
            return 'image/jpeg'
        elif ext == '.png':
            return 'image/png'
        return 'application/octet-stream'

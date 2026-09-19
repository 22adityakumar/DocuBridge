import logging
import boto3
from botocore.exceptions import ClientError
from flask import current_app

logger = logging.getLogger(__name__)

class S3Client:
    """
    Boilerplate client wrapper for AWS S3 interactions.
    """
    def __init__(self):
        self.bucket_name = current_app.config.get("AWS_S3_BUCKET")
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=current_app.config.get("AWS_ACCESS_KEY_ID"),
            aws_secret_access_key=current_app.config.get("AWS_SECRET_ACCESS_KEY"),
            region_name=current_app.config.get("AWS_DEFAULT_REGION", "us-east-1")
        )

    def upload_file(self, file_body, object_name):
        """
        Uploads a file to the S3 bucket.
        """
        try:
            logger.info(f"Uploading object {object_name} to bucket {self.bucket_name}")
            self.s3_client.upload_fileobj(file_body, self.bucket_name, object_name)
            return True
        except ClientError as e:
            logger.error(f"Failed to upload to S3: {e}")
            return False

    def generate_presigned_url(self, object_name, expiration=3600):
        """
        Generates a presigned URL to retrieve the S3 object.
        """
        try:
            url = self.s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': object_name},
                ExpiresIn=expiration
            )
            return url
        except ClientError as e:
            logger.error(f"Failed to generate presigned URL: {e}")
            return None

    def delete_file(self, object_name):
        """
        Deletes a file from the S3 bucket.
        """
        try:
            logger.info(f"Deleting object {object_name} from bucket {self.bucket_name}")
            self.s3_client.delete_object(Bucket=self.bucket_name, Key=object_name)
            return True
        except ClientError as e:
            logger.error(f"Failed to delete from S3: {e}")
            return False

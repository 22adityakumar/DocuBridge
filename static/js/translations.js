const translations = {
    ja: {
        "nav-home": "ホーム", "nav-upload": "文書アップロード", "nav-dashboard": "ダッシュボード",
        "nav-analytics": "分析・レポート", "nav-audit": "文書監査", "nav-audit-logs": "監査ログ", "nav-enterprise": "エンタープライズ版",
        "nav-subtitle": "クラウド連携パイプライン",
        "footer-status": "稼働状況: 正常稼働中 (System Online)", "footer-terms": "利用規約",
        "footer-privacy": "プライバシーポリシー", "footer-support": "サポート窓口",
        "footer-company": "© 2026 株式会社ドキュブリッジ. All rights reserved.", "footer-logo": "DocuBridge Pipeline",
        "status-s3-saved": "保管済 (S3)", "status-s3-pending": "待機中", "status-s3-missing": "未保管",
        "status-ai-analyzed": "解析済 (AI)", "status-ai-success": "解析完了 (AI)", "status-ai-error": "解析失敗",
        "status-ai-processing": "解析待ち", "status-ai-failed-short": "エラー", "status-ai-running-short": "処理中",
        "status-pipe-success": "処理完了", "status-pipe-error": "エラー", "status-pipe-pending": "待機中", "status-pipe-running": "処理中",
        "status-btn-download": "原本", "status-btn-disabled": "不可", "status-no-data": "条件に一致する文書が見つかりません。",
        "status-recent-no-data": "アップロードされた書類がありません。", "status-loading-logs": "監査ログを取得しています...",
        "status-loading-audit": "監査対象データを読み込み中...", "status-no-data-load-err": "データの読み込みに失敗しました。",
        "status-loading-recent": "最新データを読み込み中...",
        "status-no-logs": "条件に一致するログが存在しません。", "status-last-updated": "最終更新: ",
        "status-chart-timeline-name": "処理件数", "status-chart-monthly-spending-name": "支出額",
        "status-chart-monthly-spending-yaxis": "支出額 (円)", "status-chart-pie-success": "完了 (Success)",
        "status-chart-pie-pending": "待機中 (Pending)", "status-chart-pie-failed": "エラー (Failed)",
        "status-chart-pie-hanko": "署名・押印あり", "status-chart-pie-nohanko": "署名・押印なし",
        "err-invalid-format": "無効なファイル形式です。PNG、JPEG、PDFのみアップロードできます。",
        "err-file-large": "ファイルサイズが20MBを超えています。", "status-uploading": "アップロード中...",
        "status-server-processing": "サーバーで処理中...", "status-upload-success": "アップロード完了",
        "status-upload-success-desc": "文書の取り込みが完了しました", "status-upload-fail": "アップロード失敗",
        "status-network-error": "ネットワーク接続エラーが発生しました",
        "home-hero-badge": "DocuBridge Legacy Pipeline",
        "home-hero-title": "レガシーな業務文書を、<br>スマートにクラウド統合。",
        "home-hero-desc": "「DocuBridge」は、署名や社印・押印された物理契約書、スキャン書類を瞬時にアップロード・解析し、セキュアなAWS S3アーカイブとGoogle Geminiによる高度な自動データ抽出を実現する、エンタープライズ特化型データ連携システムです。",
        "home-hero-btn-upload": "文書をアップロードする", "home-hero-btn-dashboard": "ダッシュボードを表示",
        "home-step1-title": "紙面・署名書類の読込", "home-step1-desc": "PDF / JPEG / PNG アップロード",
        "home-step2-title": "S3 セキュリティ保管", "home-step2-desc": "AWS クラウドへの自動格納",
        "home-step3-title": "Gemini AI & CV 解析", "home-step3-desc": "Gemini OCR 抽出 & 認証印影照合",
        "home-feature1-title": "高信頼セキュア設計",
        "home-feature1-desc": "アップロードされたすべての機密文書は、業界水準の暗号化を適用したAWS S3プライベートバケットへ即時に安全格納されます。",
        "home-feature2-title": "Gemini 2.5 Flash 搭載",
        "home-feature2-desc": "Googleの次世代軽量高速モデルを活用し、重要ビジネス文書の文字起こしや署名・印影の有無確認、重要キー情報の自動分類を圧倒的なレスポンスで実行します。",
        "home-feature3-title": "トレーサビリティの徹底",
        "home-feature3-desc": "ファイルの取り込みからデータベース格納までの工程をフルログ。全ての処理履歴をリアルタイムに監査ログから検索できます。",
        "home-status-title": "システム稼働ステータス正常", "home-status-desc": "現在すべてのAPIサービス、データベース、クラウド連携機能は健全に作動しています。",
        "home-status-btn": "システム稼働履歴（監査ログ）を確認する",
        "upload-header": "文書ファイルのアップロード",
        "upload-desc": "処理対象のファイル（契約書スキャン、注文書、各種社内紙面データのPDFや画像）をドロップするか選択してください。",
        "upload-zone-title": "ここにファイルをドラッグ＆ドロップ", "upload-zone-or": "または",
        "upload-zone-btn": "ローカルファイルを選択", "upload-zone-format": "PDF、PNG、JPGファイルに対応（最大20MB）",
        "upload-spec-title": "アップロード要領と仕様", "upload-spec1-title": "推奨解像度・品質",
        "upload-spec1-desc": "署名や印影、文字データをGemini AIで正確に認識させるため、スキャン解賞度300dpi以上のクリアな画像を推奨します。",
        "upload-spec2-title": "対応ファイル形式", "upload-spec2-desc": "PDF (.pdf), PNG (.png), JPEG (.jpg, .jpeg) の3フォーマットを処理可能です。",
        "upload-spec3-title": "AWS & S3 ストレージ連携",
        "upload-spec3-desc": "アップロードされたバイナリは即座に暗号化の上、クラウドバケットの `raw-ingest/` ディレクトリへセキュアにアーカイブされます。",
        "upload-security-text": "セキュリティ通知: アップロードされたデータは、弊社のエンタープライズ情報セキュリティ基本方針に基づいて暗号化保護され、無関係なサードパーティには開示されません。",
        "upload-history-title": "新規取り込み文書一覧", "upload-history-refresh": "最新に更新",
        "upload-th-id": "文書ID", "upload-th-name": "ファイル名", "upload-th-time": "登録日時",
        "upload-th-s3": "S3アップロード", "upload-th-ai": "AI解析結果", "upload-th-status": "パイプライン状態",
        "dash-header": "エグゼクティブ・ダッシュボード",
        "dash-subheader": "Gemini AI が抽出した請求データ、月次支出額、取引先ランキング、および認証コンプライアンス指標を可視化します。",
        "dash-refreshing": "自動更新中 (30秒間隔)", "dash-btn-upload": "文書アップロード",
        "dash-kpi1-title": "請求書 処理総数", "dash-kpi1-desc": "総アップロード書類数",
        "dash-kpi2-title": "データ抽出完了", "dash-kpi2-desc": "正常抽出完了率: ",
        "dash-kpi3-title": "平均 AI 信頼度スコア", "dash-kpi3-desc": "Gemini 2.5 Flash Vision 抽出精度",
        "dash-kpi4-title": "署名・承認適合率", "dash-kpi4-desc": "全請求書における署名・社印存在比率",
        "dash-chart1-title": "月次支出トレンド (Monthly Spending)", "dash-chart2-title": "取引先支出ランキング (Top Vendors)",
        "dash-chart3-title": "署名・承認ステータス (Compliance)", "dash-table-title": "最近アップロードされた書類",
        "dash-btn-view-all": "全一覧を表示",
        "analytics-header": "統計・分析レポート",
        "analytics-subheader": "文書パイプラインの処理スループット、AI抽出成功率、システムエラー分布の分析です。",
        "analytics-btn-recalculate": "再集計", "analytics-btn-print": "帳票印刷",
        "analytics-chart1-title": "処理件数推移 (直近7日間)", "analytics-chart2-title": "処理結果内訳",
        "analytics-table-title": "詳細パフォーマンス統計", "analytics-th-period": "集計期間",
        "analytics-th-total": "総入力数", "analytics-th-s3": "S3保存完了数", "analytics-th-ai": "AI解析成功数",
        "analytics-th-errors": "エラー件数", "analytics-th-avgtime": "平均所要時間", "analytics-th-uptime": "正常稼働率",
        "analytics-td-today": "本日 (2026-07-15)", "analytics-td-yesterday": "昨日 (2026-07-14)",
        "analytics-td-last7": "直近7日間 (累計)", "analytics-insight-title": "データ分析所見:",
        "analytics-insight-desc": "本週の平均インジェスト処理時間は4.2秒と目標値(5.0秒以内)を維持しています。Gemini 2.5 Flashによる自動テキスト・印影・署名抽出精度は96.5%に達しており、極端に解像度の低い画像を除いてほぼ完全な自動仕分けが行われています。",
        "audit-panel-header": "文書・請求監査パネル (Audit Panel)",
        "audit-panel-subheader": "抽出された請求明細データや認証信頼度、およびオリジナルファイルの確認・監査を行います。",
        "audit-panel-search-label": "ドキュメント検索", "audit-panel-search-placeholder": "文書名、取引先名、ステータス等でリアルタイム検索...",
        "audit-panel-pagesize-label": "ページサイズ", "audit-panel-th-filename": "文書名 (File Name)",
        "audit-panel-th-vendor": "取引先 (Vendor)", "audit-panel-th-amount": "金額 (Amount)",
        "audit-panel-th-time": "登録日時 (Upload Time)", "audit-panel-th-status": "状態 (Status)",
        "audit-panel-th-confidence": "信頼度 (Confidence)", "audit-panel-th-download": "原本ダウンロード (Download)",
        "audit-panel-showing-label-pre": "全 ", "audit-panel-showing-label-mid1": " 件中 ",
        "audit-panel-showing-label-mid2": " - ", "audit-panel-showing-label-post": " 件表示",
        "audit-panel-opt-5": "5件 / ページ", "audit-panel-opt-10": "10件 / ページ",
        "audit-panel-opt-25": "25件 / ページ", "audit-panel-opt-50": "50件 / ページ",
        "audit-panel-showing-records-format": "全 {total} 件中 {start} - {end} 件表示",
        "logs-header": "システム監査・実行ログ",
        "logs-subheader": "ドキュメントアップロードからGemini AIによる解析・格納までの全実行ステップのトレーサビリティ履歴です。",
        "logs-btn-reload": "再読み込み", "logs-filter-keyword": "キーワード検索",
        "logs-filter-placeholder": "ファイル名、メッセージ等で絞り込み...", "logs-filter-level": "ログレベル",
        "logs-filter-stage": "実行パイプライン工程", "logs-btn-reset": "フィルター解除",
        "logs-th-id": "ログID", "logs-th-level": "ログレベル", "logs-th-stage": "実行工程",
        "logs-th-docid": "文書ID", "logs-th-message": "ログメッセージ", "logs-th-time": "記録日時",
        "logs-level-all": "すべて表示", "logs-stage-all": "すべての工程",
        "home-title": "ホーム | DocuBridge Document Pipeline",
        "upload-title": "文書アップロード | DocuBridge Document Pipeline",
        "dash-title": "ダッシュボード | DocuBridge Document Pipeline",
        "analytics-title": "分析・レポート | DocuBridge Document Pipeline",
        "logs-title": "監査ログ | DocuBridge Document Pipeline",
        "audit-panel-title": "監査パネル | DocuBridge Document Pipeline"
    },
    en: {
        "nav-home": "Home", "nav-upload": "Upload Document", "nav-dashboard": "Dashboard",
        "nav-analytics": "Analytics", "nav-audit": "Audit Panel", "nav-audit-logs": "Audit Logs", "nav-enterprise": "Enterprise Edition",
        "nav-subtitle": "Cloud Ingestion Pipeline",
        "footer-status": "System Status: Online", "footer-terms": "Terms of Service",
        "footer-privacy": "Privacy Policy", "footer-support": "Support Center",
        "footer-company": "© 2026 DocuBridge Co., Ltd. All rights reserved.", "footer-logo": "DocuBridge Pipeline",
        "status-s3-saved": "Stored (S3)", "status-s3-pending": "Pending", "status-s3-missing": "Not Stored",
        "status-ai-analyzed": "Analyzed (AI)", "status-ai-success": "Extracted (AI)", "status-ai-error": "Extraction Failed",
        "status-ai-processing": "Processing", "status-ai-failed-short": "Failed", "status-ai-running-short": "Running",
        "status-pipe-success": "Success", "status-pipe-error": "Error", "status-pipe-pending": "Pending", "status-pipe-running": "Processing",
        "status-btn-download": "Download", "status-btn-disabled": "Disabled", "status-no-data": "No matching documents found.",
        "status-recent-no-data": "No documents uploaded yet.", "status-loading-logs": "Fetching audit logs...",
        "status-loading-audit": "Loading audit data...", "status-no-data-load-err": "Failed to load document data.",
        "status-loading-recent": "Loading recent data...",
        "status-no-logs": "No matching log entries found.", "status-last-updated": "Last Updated: ",
        "status-chart-timeline-name": "Processed Count", "status-chart-monthly-spending-name": "Spending Amount",
        "status-chart-monthly-spending-yaxis": "Amount (JPY)", "status-chart-pie-success": "Success",
        "status-chart-pie-pending": "Pending", "status-chart-pie-failed": "Failed",
        "status-chart-pie-hanko": "Signed/Stamped", "status-chart-pie-nohanko": "Unsigned/Unstamped",
        "err-invalid-format": "Invalid file format. Only PNG, JPEG, and PDF files are allowed.",
        "err-file-large": "File size exceeds the allowed limit of 20MB.", "status-uploading": "Uploading...",
        "status-server-processing": "Processing on server...", "status-upload-success": "Upload Completed",
        "status-upload-success-desc": "Document ingestion completed successfully", "status-upload-fail": "Upload Failed",
        "status-network-error": "A network connection error occurred",
        "home-hero-badge": "DocuBridge Legacy Pipeline",
        "home-hero-title": "Integrate Legacy Documents,<br>Smartly Into The Cloud.",
        "home-hero-desc": "DocuBridge is an enterprise-grade data pipeline that instantly uploads and parses signed or stamped physical contracts and scanned papers. It integrates secure AWS S3 storage with advanced AI metadata extraction via Google Gemini.",
        "home-hero-btn-upload": "Upload Document", "home-hero-btn-dashboard": "View Dashboard",
        "home-step1-title": "1. Ingest Scanned Documents", "home-step1-desc": "Upload PDF / JPEG / PNG",
        "home-step2-title": "2. Secure S3 Storage", "home-step2-desc": "Auto-archive to AWS Cloud",
        "home-step3-title": "3. Gemini OCR & CV Verification", "home-step3-desc": "Gemini metadata OCR & Siamese CNN seal verification",
        "home-feature1-title": "Enterprise Security",
        "home-feature1-desc": "All uploaded confidential documents are encrypted and immediately archived in a private AWS S3 bucket.",
        "home-feature2-title": "Powered by Gemini 2.5 Flash",
        "home-feature2-desc": "Leverages Google's lightweight fast model to deliver extremely fast transcription, signature/stamp validation, and structured metadata extraction.",
        "home-feature3-title": "Full Traceability",
        "home-feature3-desc": "Every step from upload to database insertion is fully logged and queryable in real-time through the audit log system.",
        "home-status-title": "All Systems Operational", "home-status-desc": "All API endpoints, database connections, and cloud integrations are currently operating healthy.",
        "home-status-btn": "Check System Audit Logs",
        "upload-header": "Upload Document Files",
        "upload-desc": "Drop or select document files (scanned contracts, invoices, or internal paper records) to ingest into the pipeline.",
        "upload-zone-title": "Drag & drop files here", "upload-zone-or": "or",
        "upload-zone-btn": "Browse Local Files", "upload-zone-format": "Supports PDF, PNG, and JPG formats (Max 20MB)",
        "upload-spec-title": "Ingestion Specs & Guidelines", "upload-spec1-title": "Recommended Quality",
        "upload-spec1-desc": "For accurate Gemini AI recognition of signatures, stamps, and texts, scanned clear images at 300dpi or higher are recommended.",
        "upload-spec2-title": "Supported Formats", "upload-spec2-desc": "PDF (.pdf), PNG (.png), and JPEG (.jpg, .jpeg) files are fully supported.",
        "upload-spec3-title": "AWS S3 Archiving",
        "upload-spec3-desc": "Binaries are immediately encrypted and archived to the secure `raw-ingest/` directory on cloud storage.",
        "upload-security-text": "Security Notice: Uploaded data is protected by encryption according to our enterprise security policies and is never shared with third parties.",
        "upload-history-title": "Recent Ingestions", "upload-history-refresh": "Refresh List",
        "upload-th-id": "Doc ID", "upload-th-name": "File Name", "upload-th-time": "Uploaded Time",
        "upload-th-s3": "S3 Storage", "upload-th-ai": "Gemini AI", "upload-th-status": "Pipeline Status",
        "dash-header": "Executive Dashboard",
        "dash-subheader": "Visualizes data extracted by Gemini AI, monthly spending trends, vendor spending ranking, and authorization compliance indicators.",
        "dash-refreshing": "Auto-refreshing (Every 30s)", "dash-btn-upload": "Upload Document",
        "dash-kpi1-title": "Total Invoices", "dash-kpi1-desc": "Total uploaded documents",
        "dash-kpi2-title": "Extraction Completed", "dash-kpi2-desc": "Success extraction rate: ",
        "dash-kpi3-title": "Avg AI Confidence", "dash-kpi3-desc": "Gemini 2.5 Flash Vision parsing accuracy",
        "dash-kpi4-title": "Authorization Verification Rate", "dash-kpi4-desc": "Ratio of signed/stamped invoices",
        "dash-chart1-title": "Monthly Spending Trend", "dash-chart2-title": "Top Vendors Spending Ranking",
        "dash-chart3-title": "Verification Signature Status (Compliance)", "dash-table-title": "Recent Document Uploads",
        "dash-btn-view-all": "View Full List",
        "analytics-header": "Statistical & Analytical Reports",
        "analytics-subheader": "Detailed analysis of pipeline throughput, AI extraction accuracy, and execution failure distribution.",
        "analytics-btn-recalculate": "Recalculate", "analytics-btn-print": "Print Report",
        "analytics-chart1-title": "Processing Volume (Last 7 Days)", "analytics-chart2-title": "Processing Status Breakdown",
        "analytics-table-title": "Performance KPI Breakdown", "analytics-th-period": "Aggregated Period",
        "analytics-th-total": "Total Input", "analytics-th-s3": "S3 Saved", "analytics-th-ai": "AI Successful",
        "analytics-th-errors": "Errors", "analytics-th-avgtime": "Avg Latency", "analytics-th-uptime": "Availability",
        "analytics-td-today": "Today (2026-07-15)", "analytics-td-yesterday": "Yesterday (2026-07-14)",
        "analytics-td-last7": "Last 7 Days (Accumulated)", "analytics-insight-title": "Data Insights:",
        "analytics-insight-desc": "This week's average ingestion processing latency is 4.2s, maintaining our target of under 5.0s. Automatic text and signature extraction via Gemini 2.5 Flash reaches a 96.5% accuracy rate, successfully auto-processing almost all documents, except for low-resolution files.",
        "audit-panel-header": "Document & Invoice Audit Panel",
        "audit-panel-subheader": "Auditing and validating extracted metadata, signatures, confidence scores, and raw files.",
        "audit-panel-search-label": "Search Documents", "audit-panel-search-placeholder": "Real-time search by document name, vendor, status...",
        "audit-panel-pagesize-label": "Page Size", "audit-panel-th-filename": "File Name",
        "audit-panel-th-vendor": "Vendor", "audit-panel-th-amount": "Amount",
        "audit-panel-th-time": "Upload Time", "audit-panel-th-status": "Status",
        "audit-panel-th-confidence": "Confidence", "audit-panel-th-download": "Download Link",
        "audit-panel-showing-label-pre": "Showing ", "audit-panel-showing-label-mid1": " - ",
        "audit-panel-showing-label-mid2": " of ", "audit-panel-showing-label-post": " records",
        "audit-panel-opt-5": "5 per page", "audit-panel-opt-10": "10 per page",
        "audit-panel-opt-25": "25 per page", "audit-panel-opt-50": "50 per page",
        "audit-panel-showing-records-format": "Showing {start} - {end} of {total} records",
        "logs-header": "System Audit & Execution Logs",
        "logs-subheader": "Traceability ledger recording every workflow transaction, from ingestion to AWS storage and AI schema extraction.",
        "logs-btn-reload": "Reload Logs", "logs-filter-keyword": "Keyword Search",
        "logs-filter-placeholder": "Filter by filename, stage, message...", "logs-filter-level": "Log Level",
        "logs-filter-stage": "Pipeline Stage", "logs-btn-reset": "Reset Filters",
        "logs-th-id": "Log ID", "logs-th-level": "Log Level", "logs-th-stage": "Execution Stage",
        "logs-th-docid": "Doc ID", "logs-th-message": "Message Detail", "logs-th-time": "Logged Timestamp",
        "logs-level-all": "All Levels", "logs-stage-all": "All Stages",
        "home-title": "Home | DocuBridge Document Pipeline",
        "upload-title": "Upload Document | DocuBridge Document Pipeline",
        "dash-title": "Dashboard | DocuBridge Document Pipeline",
        "analytics-title": "Analytics & Reports | DocuBridge Document Pipeline",
        "logs-title": "Audit Logs | DocuBridge Document Pipeline",
        "audit-panel-title": "Audit Panel | DocuBridge Document Pipeline"
    },
    hi: {
        "nav-home": "होम", "nav-upload": "दस्तावेज़ अपलोड", "nav-dashboard": "डैशबोर्ड",
        "nav-analytics": "विश्लेषण", "nav-audit": "दस्तावेज़ ऑडिट", "nav-audit-logs": "ऑडिट लॉग्स", "nav-enterprise": "एंटरप्राइज़ संस्करण",
        "nav-subtitle": "डेटा एकीकरण पाइपलाइन",
        "footer-status": "सिस्टम स्थिति: सामान्य (System Online)", "footer-terms": "सेवा की शर्तें",
        "footer-privacy": "गोपनीयता नीति", "footer-support": "सहायता केंद्र",
        "footer-company": "© 2026 डॉक्यूब्रीज कंपनी लिमिटेड। सर्वाधिकार सुरक्षित।", "footer-logo": "डॉक्यूब्रीज पाइपलाइन",
        "status-s3-saved": "सुरक्षित (S3)", "status-s3-pending": "लंबित", "status-s3-missing": "असुरक्षित",
        "status-ai-analyzed": "विश्लेषित (AI)", "status-ai-success": "सफल (AI)", "status-ai-error": "विश्लेषण विफल",
        "status-ai-processing": "प्रक्रिया जारी", "status-ai-failed-short": "त्रुटि", "status-ai-running-short": "चालू",
        "status-pipe-success": "पूर्ण", "status-pipe-error": "त्रुटि", "status-pipe-pending": "लंबित", "status-pipe-running": "प्रक्रिया जारी",
        "status-btn-download": "डाउनलोड", "status-btn-disabled": "अमान्य", "status-no-data": "दिए गए विवरण के अनुसार कोई दस्तावेज़ नहीं मिला।",
        "status-recent-no-data": "कोई अपलोड किया गया दस्तावेज़ नहीं है।", "status-loading-logs": "ऑडिट लॉग प्राप्त किए जा रहे हैं...",
        "status-loading-audit": "ऑडिट डेटा लोड हो रहा है...", "status-no-data-load-err": "डेटा लोड करने में विफल।",
        "status-loading-recent": "नवीनतम डेटा लोड हो रहा है...",
        "status-no-logs": "कोई मिलान लॉग प्रविष्टि नहीं मिली।", "status-last-updated": "अंतिम अद्यतन: ",
        "status-chart-timeline-name": "संसाधित संख्या", "status-chart-monthly-spending-name": "व्यय राशि",
        "status-chart-monthly-spending-yaxis": "राशि (JPY)", "status-chart-pie-success": "सफल (Success)",
        "status-chart-pie-pending": "लंबित (Pending)", "status-chart-pie-failed": "त्रुटि (Failed)",
        "status-chart-pie-hanko": "हस्ताक्षरित/मुद्रित", "status-chart-pie-nohanko": "बिना हस्ताक्षर/मुद्रा",
        "err-invalid-format": "अमान्य फ़ाइल प्रारूप। केवल PNG, JPEG, और PDF फ़ाइलों की अनुमति है।",
        "err-file-large": "फ़ाइल का आकार 20MB की अनुमत सीमा से अधिक है।", "status-uploading": "अपलोड हो रहा है...",
        "status-server-processing": "सर्वर पर प्रोसेसिंग जारी है...", "status-upload-success": "अपलोड पूर्ण हुआ",
        "status-upload-success-desc": "दस्तावेज़ अंतर्ग्रहण सफलतापूर्वक पूरा हुआ", "status-upload-fail": "अपलोड विफल",
        "status-network-error": "नेटवर्क कनेक्शन त्रुटि हुई",
        "home-hero-badge": "DocuBridge Legacy Pipeline",
        "home-hero-title": "विरासत व्यावसायिक दस्तावेजों को,<br>स्मार्ट तरीके से क्लाउड में एकीकृत करें।",
        "home-hero-desc": "「DocuBridge」 एक एंटरप्राइज-विशिष्ट डेटा एकीकरण प्रणाली है जो हस्ताक्षरित या सील लगे भौतिक अनुबंधों और स्कैन किए गए दस्तावेजों को तुरंत अपलोड और विश्लेषण करती है, जिससे सुरक्षित AWS S3 आर्काइविंग और Google Gemini का उपयोग करके उन्नत स्वचालित डेटा निष्कर्षण प्राप्त होता है।",
        "home-hero-btn-upload": "दस्तावेज़ अपलोड करें", "home-hero-btn-dashboard": "डैशबोर्ड देखें",
        "home-step1-title": "1. स्कैन किए गए दस्तावेज़ लोड करें", "home-step1-desc": "PDF / JPEG / PNG अपलोड",
        "home-step2-title": "2. सुरक्षित S3 स्टोरेज", "home-step2-desc": "AWS क्लाउड में स्वचालित संग्रह",
        "home-step3-title": "3. जेमिनी ओसीआर और सीवी प्रसंस्करण", "home-step3-desc": "जेमिनी ओसीआर और सियामी सीएनएन मुहर सत्यापन",
        "home-feature1-title": "अत्यधिक सुरक्षित डिज़ाइन",
        "home-feature1-desc": "सभी अपलोड किए गए गोपनीय दस्तावेज़ तुरंत और सुरक्षित रूप से उद्योग-मानक एन्क्रिप्शन के साथ AWS S3 निजी बकेट में संग्रहीत किए जाते हैं।",
        "home-feature2-title": "जेमिनी 2.5 फ्लैश द्वारा संचालित",
        "home-feature2-desc": "अविश्वसनीय गति से दस्तावेज़ ट्रांसक्रिप्शन, हस्ताक्षर / सील सत्यापन और संरचित डेटा निकालने के लिए Google के अगली पीढ़ी के हल्के और तेज एआई मॉडल का लाभ उठाएं।",
        "home-feature3-title": "पूर्ण पता लगाने की क्षमता (Traceability)",
        "home-feature3-desc": "डेटाबेस स्टोरेज में अपलोड होने से लेकर हर प्रक्रिया का पूर्ण लॉग। ऑडिट लॉग के माध्यम से वास्तविक समय में सभी विवरण खोजें।",
        "home-status-title": "सिस्टम स्थिति सामान्य है", "home-status-desc": "वर्तमान में सभी एपीआई सेवाएं, डेटाबेस कनेक्शन और क्लाउड एकीकरण सामान्य रूप से काम कर रहे हैं।",
        "home-status-btn": "सिस्टम ऑडिट लॉग्स जांचें",
        "upload-header": "दस्तावेज़ फ़ाइल अपलोड करें",
        "upload-desc": "प्रसंस्करण के लिए दस्तावेज़ फ़ाइलें (स्कैन किए गए अनुबंध, चालान, या आंतरिक कागजी रिकॉर्ड) को ड्रैग या सेलेक्ट करें।",
        "upload-zone-title": "यहाँ फ़ाइलों को ड्रैग और ड्रॉप करें", "upload-zone-or": "या",
        "upload-zone-btn": "लोकल फ़ाइल चुनें", "upload-zone-format": "PDF, PNG, और JPG फ़ाइल समर्थित (अधिकतम 20MB)",
        "upload-spec-title": "अपलोड विनिर्देश और दिशानिर्देश", "upload-spec1-title": "अनुशंसित गुणवत्ता",
        "upload-spec1-desc": "जेमिनी एआई द्वारा हस्ताक्षर, मुहर और टेक्स्ट की सटीक पहचान के लिए, 300dpi या उच्चतर स्कैन रिज़ॉल्यूशन की सिफारिश की जाती है।",
        "upload-spec2-title": "समर्थित प्रारूप", "upload-spec2-desc": "PDF (.pdf), PNG (.png), और JPEG (.jpg, .jpeg) प्रारूप पूरी तरह से समर्थित हैं।",
        "upload-spec3-title": "AWS S3 क्लाउड संग्रहण",
        "upload-spec3-desc": "अपलोड किए गए दस्तावेज़ तुरंत एन्क्रिप्ट किए जाते हैं और क्लाउड स्टोरेज की सुरक्षित `raw-ingest/` निर्देशिका में संग्रहीत किए जाते हैं।",
        "upload-security-text": "सुरक्षा सूचना: अपलोड किए गए डेटा को हमारे एंटरप्राइज सुरक्षा नीतियों के आधार पर एन्क्रिप्शन द्वारा सुरक्षित किया जाता है और इसे कभी किसी तीसरे पक्ष को साझा नहीं किया जाएगा।",
        "upload-history-title": "हाल ही में अपलोड किए गए दस्तावेज़", "upload-history-refresh": "सूची ताज़ा करें",
        "upload-th-id": "आईडी", "upload-th-name": "फ़ाइल नाम", "upload-th-time": "अपलोड समय",
        "upload-th-s3": "S3 स्टोरेज", "upload-th-ai": "जेमिनी एआई", "upload-th-status": "पाइपलाइन स्थिति",
        "dash-header": "एग्जीक्यूटिव डैशबोर्ड",
        "dash-subheader": "जेमिनी एआई द्वारा निकाले गए चालान डेटा, मासिक व्यय प्रवृत्तियों, विक्रेता व्यय रैंकिंग और प्रमाणीकरण अनुपालन संकेतकों को दिखाता है।",
        "dash-refreshing": "ऑटो-अपडेट सक्रिय (हर 30 सेकंड)", "dash-btn-upload": "दस्तावेज़ अपलोड",
        "dash-kpi1-title": "कुल प्रसंस्कृत चालान", "dash-kpi1-desc": "कुल अपलोड किए गए दस्तावेज़",
        "dash-kpi2-title": "डेटा निष्कर्षण संपन्न", "dash-kpi2-desc": "सफल निष्कर्षण दर: ",
        "dash-kpi3-title": "औसत एआई विश्वास स्कोर", "dash-kpi3-desc": "जेमिनी 2.5 फ्लैश विजन सटीकता",
        "dash-kpi4-title": "हस्ताक्षर / प्रमाणीकरण दर", "dash-kpi4-desc": "सील/हस्ताक्षर वाले चालानों का अनुपात",
        "dash-chart1-title": "मासिक खर्च का रुझान", "dash-chart2-title": "शीर्ष विक्रेता खर्च रैंकिंग",
        "dash-chart3-title": "हस्ताक्षर एवं सील अनुपालन स्थिति", "dash-table-title": "हाल ही में अपलोड किए गए दस्तावेज़",
        "dash-btn-view-all": "सभी देखें",
        "analytics-header": "सांख्यिकीय और विश्लेषणात्मक रिपोर्ट",
        "analytics-subheader": "पाइपलाइन थ्रूपुट, एआई निष्कर्षण सटीकता, और विफलता वितरण का विस्तृत विश्लेषण।",
        "analytics-btn-recalculate": "पुनर्गणना", "analytics-btn-print": "रिपोर्ट प्रिंट करें",
        "analytics-chart1-title": "प्रसंस्करण मात्रा (पिछले 7 दिन)", "analytics-chart2-title": "प्रसंस्करण स्थिति विवरण",
        "analytics-table-title": "प्रदर्शन संकेतक (KPI) विवरण", "analytics-th-period": "अवधि",
        "analytics-th-total": "कुल प्रविष्टियां", "analytics-th-s3": "S3 में सहेजा गया", "analytics-th-ai": "एआई सफल",
        "analytics-th-errors": "त्रुटियां", "analytics-th-avgtime": "औसत समय", "analytics-th-uptime": "उपलब्धता",
        "analytics-td-today": "आज (2026-07-15)", "analytics-td-yesterday": "कल (2026-07-14)",
        "analytics-td-last7": "पिछले 7 दिन (कुल)", "analytics-insight-title": "डेटा विश्लेषण निष्कर्ष:",
        "analytics-insight-desc": "इस सप्ताह का औसत अंतर्ग्रहण प्रसंस्करण समय 4.2 सेकंड है, जो 5.0 सेकंड से कम के हमारे लक्ष्य को बनाए रखता है। जेमिनी 2.5 फ्लैश के माध्यम से स्वचालित पाठ, सील और हस्ताक्षर पहचान 96.5% सटीकता दर तक पहुंचती है, जिससे कम रिज़ॉल्यूशन वाली फाइलों को छोड़कर लगभग सभी दस्तावेज़ स्वचालित रूप से संसाधित हो जाते हैं।",
        "audit-panel-header": "दस्तावेज़ और चालान ऑडिट पैनल",
        "audit-panel-subheader": "निकाले गए मेटाडेटा, हस्ताक्षर, विश्वास स्कोर और मूल फाइलों की जांच और ऑडिट करें।",
        "audit-panel-search-label": "दस्तावेज़ खोजें", "audit-panel-search-placeholder": "फ़ाइल नाम, विक्रेता या स्थिति द्वारा वास्तविक समय में खोजें...",
        "audit-panel-pagesize-label": "पृष्ठ का आकार", "audit-panel-th-filename": "फ़ाइल का नाम",
        "audit-panel-th-vendor": "विक्रेता", "audit-panel-th-amount": "राशि",
        "audit-panel-th-time": "अपलोड समय", "audit-panel-th-status": "स्थिति",
        "audit-panel-th-confidence": "विश्वास", "audit-panel-th-download": "डाउनलोड लिंक",
        "audit-panel-showing-label-pre": "कुल ", "audit-panel-showing-label-mid1": " रिकॉर्ड में से ",
        "audit-panel-showing-label-mid2": " - ", "audit-panel-showing-label-post": " दिखा रहा है",
        "audit-panel-opt-5": "5 प्रति पृष्ठ", "audit-panel-opt-10": "10 प्रति पृष्ठ",
        "audit-panel-opt-25": "25 प्रति पृष्ठ", "audit-panel-opt-50": "50 प्रति पृष्ठ",
        "audit-panel-showing-records-format": "कुल {total} रिकॉर्ड में से {start} - {end} दिखा रहा है",
        "logs-header": "सिस्टम ऑडिट और निष्पादन लॉग्स",
        "logs-subheader": "दस्तावेज़ अपलोड होने से लेकर सुरक्षित AWS स्टोरेज और जेमिनी एआई योजना निष्कर्षण तक प्रत्येक लेनदेन को रिकॉर्ड करने वाली लेज़र।",
        "logs-btn-reload": "लॉग पुनः लोड करें", "logs-filter-keyword": "कीवर्ड खोज",
        "logs-filter-placeholder": "फ़ाइल नाम, चरण या संदेश द्वारा फ़िल्टर करें...", "logs-filter-level": "लॉग स्तर",
        "logs-filter-stage": "पाइपलाइन चरण", "logs-btn-reset": "फ़िल्टर साफ़ करें",
        "logs-th-id": "लॉग आईडी", "logs-th-level": "लॉग स्तर", "logs-th-stage": "प्रक्रिया चरण",
        "logs-th-docid": "दस्तावेज़ आईडी", "logs-th-message": "विवरण संदेश", "logs-th-time": "समय",
        "logs-level-all": "सभी लॉग स्तर", "logs-stage-all": "सभी चरण",
        "home-title": "होम | DocuBridge Document Pipeline",
        "upload-title": "अपलोड | DocuBridge Document Pipeline",
        "dash-title": "डैशबोर्ड | DocuBridge Document Pipeline",
        "analytics-title": "विश्लेषण | DocuBridge Document Pipeline",
        "logs-title": "ऑडिट लॉग्स | DocuBridge Document Pipeline",
        "audit-panel-title": "ऑडिट | DocuBridge Document Pipeline"
    }
};

function getTranslation(key, lang = null) {
    if (!lang) lang = localStorage.getItem("app_language") || "ja";
    if (translations[lang] && translations[lang][key]) return translations[lang][key];
    if (translations["ja"] && translations["ja"][key]) return translations["ja"][key];
    return key;
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(el => {
        const key = el.getAttribute("data-translate");
        const trans = getTranslation(key, lang);
        
        if (el.querySelector("i")) {
            const icon = el.querySelector("i").outerHTML;
            el.innerHTML = icon + " " + trans;
        } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.setAttribute("placeholder", trans);
        } else {
            if (trans.includes("<br>")) el.innerHTML = trans;
            else el.textContent = trans;
        }
    });

    const pageTitleKey = getPageTitleKey();
    if (pageTitleKey) document.title = getTranslation(pageTitleKey, lang);

    const dropdownBtn = document.getElementById("current-language-label");
    if (dropdownBtn) {
        const langNames = { ja: "🇯🇵 日本語", en: "🇺🇸 English", hi: "🇮🇳 हिन्दी" };
        dropdownBtn.textContent = langNames[lang] || "Language";
    }

    document.body.className = document.body.className.replace(/\blang-\S+/g, '');
    document.body.classList.add(`lang-${lang}`);

    const lastUpdatedEl = document.getElementById("last-updated-time");
    if (lastUpdatedEl) {
        const currentText = lastUpdatedEl.textContent || "";
        if (currentText.includes("--:--:--")) {
            const prefix = getTranslation("status-last-updated", lang);
            lastUpdatedEl.textContent = prefix + "--:--:--";
        } else {
            const prefixJA = getTranslation("status-last-updated", "ja");
            const prefixEN = getTranslation("status-last-updated", "en");
            const prefixHI = getTranslation("status-last-updated", "hi");
            
            let timePart = currentText;
            timePart = timePart.replace(prefixJA, "");
            timePart = timePart.replace(prefixEN, "");
            timePart = timePart.replace(prefixHI, "");
            
            const newPrefix = getTranslation("status-last-updated", lang);
            lastUpdatedEl.textContent = newPrefix + timePart.trim();
        }
    }
}

function getPageTitleKey() {
    const path = window.location.pathname;
    if (path === "/" || path.endsWith("/home") || path.endsWith("/")) return "home-title";
    if (path.includes("/upload")) return "upload-title";
    if (path.includes("/dashboard")) return "dash-title";
    if (path.includes("/analytics")) return "analytics-title";
    if (path.includes("/audit-logs")) return "logs-title";
    if (path.includes("/audit")) return "audit-panel-title";
    return null;
}

function changeLanguage(lang) {
    document.body.classList.remove("lang-loaded");
    
    // Smooth transition delay to prevent layout flickering during reload
    setTimeout(() => {
        localStorage.setItem("app_language", lang);
        applyTranslations(lang);
        
        if (typeof loadExecutiveDashboard === "function" && typeof isExecutiveDashboard !== 'undefined' && isExecutiveDashboard) {
            loadExecutiveDashboard();
        } else {
            if (typeof loadAnalytics === "function" && (document.getElementById("chart-timeline") || document.getElementById("chart-distribution"))) {
                loadAnalytics();
            }
            if (typeof loadDocuments === "function" && document.getElementById("document-table-body")) {
                loadDocuments();
            }
        }
        
        if (typeof loadRecentLogs === "function" && document.getElementById("recent-logs-list")) {
            loadRecentLogs();
        }

        if (typeof fetchAuditLogs === "function" && document.getElementById("audit-log-table-body")) {
            fetchAuditLogs();
        }

        if (typeof fetchAuditData === "function" && document.getElementById("audit-table-body")) {
            fetchAuditData();
        }
        
        // Re-reveal page layout after content update is fully complete
        setTimeout(() => {
            document.body.classList.add("lang-loaded");
        }, 80);
    }, 150);
}

document.addEventListener("DOMContentLoaded", () => {
    const defaultLang = localStorage.getItem("app_language") || "ja";
    applyTranslations(defaultLang);
    
    // Instantly reveal page content once translated on first load
    document.body.classList.add("lang-loaded");
});

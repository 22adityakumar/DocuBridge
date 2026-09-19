document.addEventListener("DOMContentLoaded", () => {
    // Initial calls depending on elements present in the template
    initDragAndDrop();
    
    // Check if we are on the executive dashboard
    if (typeof isExecutiveDashboard !== 'undefined' && isExecutiveDashboard) {
        loadExecutiveDashboard();
        // Set up automatic refresh every 30 seconds
        setInterval(loadExecutiveDashboard, 30000);
    } else {
        if (document.getElementById("chart-timeline") || document.getElementById("chart-distribution")) {
            loadAnalytics();
        }
        if (document.getElementById("document-table-body")) {
            loadDocuments();
        }
    }
    
    if (document.getElementById("recent-logs-list")) {
        loadRecentLogs();
    }
});

/**
 * Drag and Drop File Upload Handling
 */
function initDragAndDrop() {
    const dropZone = document.getElementById("drop-zone");
    const fileInput = document.getElementById("file-input");

    if (!dropZone || !fileInput) return;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            handleFileUpload(files[0]);
        }
    });

    // Handle file input selection
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFileUpload(e.target.files[0]);
        }
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * Handles the actual file upload process, including validation, preview generation,
 * progress tracking, and AJAX request dispatch.
 */
function handleFileUpload(file) {
    const dropZone = document.getElementById("drop-zone");
    if (!dropZone) return;
    
    const originalContent = dropZone.innerHTML;
    const lang = localStorage.getItem("app_language") || "ja";

    // 1. Client-side Validation
    const allowedExtensions = /(\.png|\.jpg|\.jpeg|\.pdf)$/i;
    if (!allowedExtensions.exec(file.name)) {
        alert(getTranslation("err-invalid-format", lang));
        return;
    }

    const maxSizeBytes = 20 * 1024 * 1024; // 20 MB
    if (file.size > maxSizeBytes) {
        alert(getTranslation("err-file-large", lang));
        return;
    }

    // 2. Generate Preview Markup
    let previewMarkup = "";
    if (file.type.match('image.*')) {
        previewMarkup = `<div class="mb-3"><img id="upload-preview-img" class="img-thumbnail bg-white" style="max-height: 120px; object-fit: contain;" src="" alt="Preview"></div>`;
    } else if (file.type === 'application/pdf') {
        previewMarkup = `<div class="mb-3 text-danger"><i class="fa-solid fa-file-pdf fa-3x"></i></div>`;
    } else {
        previewMarkup = `<div class="mb-3 text-secondary"><i class="fa-solid fa-file fa-3x"></i></div>`;
    }

    // Show upload template with file name, preview, and progress bar
    const labelUploading = getTranslation("status-uploading", lang);
    dropZone.innerHTML = `
        <div class="text-center py-3 w-100" style="max-width: 400px; margin: 0 auto;">
            ${previewMarkup}
            <h6 class="fw-bold text-dark-blue mb-1 text-truncate" style="max-width: 100%;">${escapeHtml(file.name)}</h6>
            <p class="text-muted small mb-3">(${formatBytes(file.size)})</p>
            
            <div class="progress mb-2" style="height: 8px; border-radius: 4px; overflow: hidden;">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%;" id="upload-progress-bar"></div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <span class="text-xs text-muted" id="upload-status-text">${labelUploading}</span>
                <span class="text-xs fw-bold text-primary" id="upload-progress-percentage">0%</span>
            </div>
        </div>
    `;

    // 3. Read image file for thumbnail preview
    if (file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgEl = document.getElementById("upload-preview-img");
            if (imgEl) imgEl.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // 4. Dispatch XHR request for progress tracking
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    // Track upload progress
    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            const progressBar = document.getElementById("upload-progress-bar");
            const progressPercentage = document.getElementById("upload-progress-percentage");
            
            if (progressBar) progressBar.style.width = percent + '%';
            if (progressPercentage) progressPercentage.innerText = percent + '%';
            
            if (percent === 100) {
                const statusText = document.getElementById("upload-status-text");
                if (statusText) statusText.innerText = getTranslation("status-server-processing", lang);
            }
        }
    });

    // Handle completed request
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                console.log('Upload response:', response);
                
                const labelSuccess = getTranslation("status-upload-success", lang);
                const labelSuccessDesc = getTranslation("status-upload-success-desc", lang);
                dropZone.innerHTML = `
                    <div class="text-center py-4 text-success">
                        <i class="fa-solid fa-circle-check fa-3x mb-2"></i>
                        <p class="mb-0 fw-bold">${labelSuccess}</p>
                        <p class="text-xs text-muted">${labelSuccessDesc}</p>
                    </div>
                `;
            } catch (e) {
                console.error("Failed to parse server upload response", e);
            }
            
            setTimeout(() => {
                dropZone.innerHTML = originalContent;
                initDragAndDrop();
                loadDocuments();
                loadRecentLogs();
            }, 2000);
        } else {
            handleUploadError(xhr.statusText || getTranslation("status-pipe-error", lang), dropZone, originalContent);
        }
    };

    xhr.onerror = function () {
        handleUploadError(getTranslation("status-network-error", lang), dropZone, originalContent);
    };

    xhr.send(formData);
}

function handleUploadError(message, dropZone, originalContent) {
    const lang = localStorage.getItem("app_language") || "ja";
    const labelFail = getTranslation("status-upload-fail", lang);
    dropZone.innerHTML = `
        <div class="text-center py-4 text-danger">
            <i class="fa-solid fa-triangle-exclamation fa-3x mb-2"></i>
            <p class="mb-0 fw-bold">${labelFail}</p>
            <p class="text-xs text-muted">${escapeHtml(message)}</p>
        </div>
    `;
    setTimeout(() => {
        dropZone.innerHTML = originalContent;
        initDragAndDrop();
    }, 3000);
}

/**
 * Format bytes to readable units
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Fetch and Render Analytics using Plotly.js (Corporate Blue + White Theme)
 */
function loadAnalytics() {
    fetch('/api/analytics')
        .then(response => response.json())
        .then(data => {
            // Update Metric KPI widgets if they exist on the page
            const totalDocsEl = document.getElementById("stat-total-docs");
            const processedEl = document.getElementById("stat-processed");
            const latencyEl = document.getElementById("stat-latency");
            const pendingEl = document.getElementById("stat-pending");
            
            if (totalDocsEl) totalDocsEl.innerText = data.summary.total_processed;
            if (processedEl) processedEl.innerText = data.status_distribution.values[0];
            if (latencyEl) latencyEl.innerText = `${data.summary.avg_processing_time}s`;
            if (pendingEl) pendingEl.innerText = data.summary.total_processed - data.status_distribution.values[0] - data.status_distribution.values[2];
            
            // Render Charts
            renderCorporateTimelineChart(data.processing_timeline);
            renderCorporateDistributionChart(data.status_distribution);
            
            // Render Detailed Performance Table
            const tableBody = document.getElementById("analytics-table-body");
            if (tableBody && data.detailed) {
                tableBody.innerHTML = "";
                const lang = localStorage.getItem("app_language") || "ja";
                
                const periods = [
                    { key: "today", labelKey: "analytics-td-today", defaultLabel: "本日" },
                    { key: "yesterday", labelKey: "analytics-td-yesterday", defaultLabel: "昨日" },
                    { key: "last7", labelKey: "analytics-td-last7", defaultLabel: "直近7日間 (累計)" }
                ];
                
                periods.forEach(p => {
                    const stats = data.detailed[p.key];
                    const tr = document.createElement("tr");
                    
                    const labelText = getTranslation(p.labelKey, lang) || p.defaultLabel;
                    const uptimeVal = parseFloat(stats.uptime);
                    let uptimeClass = "text-muted";
                    if (uptimeVal > 90) uptimeClass = "text-success fw-bold";
                    else if (uptimeVal > 50) uptimeClass = "text-warning fw-bold";
                    else if (uptimeVal > 0) uptimeClass = "text-danger fw-bold";
                    
                    tr.innerHTML = `
                        <td class="fw-bold text-start ps-3" data-translate="${p.labelKey}">${labelText}</td>
                        <td>${stats.total}</td>
                        <td>${stats.s3_saved}</td>
                        <td>${stats.ai_success}</td>
                        <td>${stats.errors}</td>
                        <td>${stats.avg_time}</td>
                        <td><span class="${uptimeClass}">${stats.uptime}</span></td>
                    `;
                    tableBody.appendChild(tr);
                });
            }
        })
        .catch(err => console.error("Error loading analytics:", err));
}

function renderCorporateTimelineChart(timelineData) {
    const chartEl = document.getElementById('chart-timeline');
    if (!chartEl) return;

    const lang = localStorage.getItem("app_language") || "ja";
    const labelTimelineName = getTranslation("status-chart-timeline-name", lang);

    const trace = {
        x: timelineData.dates,
        y: timelineData.document_counts,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: '#0052cc', size: 6, line: { color: '#ffffff', width: 1.5 } },
        line: { color: '#0052cc', width: 2, shape: 'linear' },
        fill: 'tozeroy',
        fillcolor: 'rgba(0, 82, 204, 0.04)',
        name: labelTimelineName
    };

    const layout = {
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        margin: { t: 10, r: 20, b: 35, l: 35 },
        xaxis: {
            gridcolor: '#f1f3f5',
            tickfont: { color: '#495057', family: 'Inter, Noto Sans JP', size: 10 },
            showgrid: true,
            linecolor: '#dee2e6'
        },
        yaxis: {
            gridcolor: '#f1f3f5',
            tickfont: { color: '#495057', family: 'Inter, Noto Sans JP', size: 10 },
            showgrid: true,
            linecolor: '#dee2e6'
        },
        showlegend: false,
        height: 250
    };

    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot('chart-timeline', [trace], layout, config);
}

function renderCorporateDistributionChart(distData) {
    const chartEl = document.getElementById('chart-distribution');
    if (!chartEl) return;

    const lang = localStorage.getItem("app_language") || "ja";
    const lblSuccess = getTranslation("status-chart-pie-success", lang);
    const lblPending = getTranslation("status-chart-pie-pending", lang);
    const lblFailed = getTranslation("status-chart-pie-failed", lang);

    const trace = {
        labels: [lblSuccess, lblPending, lblFailed],
        values: distData.values,
        type: 'pie',
        hole: 0.5,
        marker: {
            colors: ['#0052cc', '#ff9900', '#cc3300'] // Navy Blue, Warm Orange, Muted Dark Red
        },
        textinfo: 'percent',
        textfont: { color: '#ffffff', family: 'Inter, Noto Sans JP', size: 10, weight: 'bold' },
        hoverinfo: 'label+value',
    };

    const layout = {
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        margin: { t: 10, r: 10, b: 10, l: 10 },
        showlegend: true,
        legend: {
            x: 0.5,
            y: -0.1,
            xanchor: 'center',
            orientation: 'h',
            font: { color: '#495057', family: 'Inter, Noto Sans JP', size: 9 }
        },
        height: 250
    };

    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot('chart-distribution', [trace], layout, config);
}

/**
 * Fetch and Populate Ingestion History Table
 */
function loadDocuments() {
    const tableBody = document.getElementById("document-table-body");
    if (!tableBody) return;

    fetch('/api/documents')
        .then(response => response.json())
        .then(documents => {
            tableBody.innerHTML = "";
            const lang = localStorage.getItem("app_language") || "ja";
            
            if (documents.length === 0) {
                const lang = localStorage.getItem("app_language") || "ja";
                const noDocsText = lang === 'hi' ? "कोई दस्तावेज़ नहीं मिला।" : lang === 'en' ? "No documents uploaded yet." : "アップロードされた文書はありません。";
                tableBody.innerHTML = `
                    <tr>
                        <td colspan="6" class="text-center text-muted py-4">
                            <i class="fa-solid fa-folder-open me-2 text-secondary"></i> ${noDocsText}
                        </td>
                    </tr>
                `;
                return;
            }

            documents.forEach(doc => {
                const tr = document.createElement("tr");
                
                const s3Class = doc.s3_key ? 'success' : 'pending';
                const s3Text = doc.s3_key ? getTranslation("status-s3-saved", lang) : getTranslation("status-s3-pending", lang);
                
                const geminiClass = doc.extracted_data ? 'success' : doc.status === 'FAILED' ? 'failed' : 'pending';
                const geminiText = doc.extracted_data ? getTranslation("status-ai-analyzed", lang) : doc.status === 'FAILED' ? getTranslation("status-ai-failed-short", lang) : getTranslation("status-ai-running-short", lang);
                
                const statusClass = doc.status.toLowerCase() === 'processed' ? 'success' : 
                                    doc.status.toLowerCase() === 'failed' ? 'failed' : 'pending';
                
                const statusTextKey = doc.status === 'PROCESSED' ? 'status-pipe-success' : 
                                     doc.status === 'FAILED' ? 'status-pipe-error' : 'status-pipe-pending';
                const statusText = getTranslation(statusTextKey, lang);

                tr.innerHTML = `
                    <td class="fw-bold">#${doc.id}</td>
                    <td class="text-start">${escapeHtml(doc.filename)}</td>
                    <td>${new Date(doc.created_at).toLocaleString(lang === 'ja' ? 'ja-JP' : lang === 'hi' ? 'hi-IN' : 'en-US')}</td>
                    <td><span class="badge-status ${s3Class}">${s3Text}</span></td>
                    <td><span class="badge-status ${geminiClass}">${geminiText}</span></td>
                    <td><span class="badge-status ${statusClass}">${statusText}</span></td>
                `;
                tableBody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error("Error loading documents:", err);
            const lang = localStorage.getItem("app_language") || "ja";
            const failFetchText = lang === 'hi' ? "डेटा प्राप्त करने में विफल।" : lang === 'en' ? "Failed to retrieve data." : "データの取得に失敗しました。";
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-danger py-4">
                        <i class="fa-solid fa-triangle-exclamation me-2"></i> ${failFetchText}
                    </td>
                </tr>
            `;
        });
}

function renderCorporateMockTable(mockDocs, tableBody) {
    const lang = localStorage.getItem("app_language") || "ja";
    mockDocs.forEach(doc => {
        const tr = document.createElement("tr");
        const s3Class = doc.s3_key ? 'success' : 'pending';
        const geminiClass = doc.extracted_data ? 'success' : doc.status === 'FAILED' ? 'failed' : 'pending';
        const statusClass = doc.status.toLowerCase() === 'processed' ? 'success' : 
                            doc.status.toLowerCase() === 'failed' ? 'failed' : 'pending';

        const s3Text = doc.s3_key ? getTranslation("status-s3-saved", lang) : getTranslation("status-s3-pending", lang);
        const geminiText = doc.extracted_data ? getTranslation("status-ai-success", lang) : doc.status === 'FAILED' ? getTranslation("status-ai-error", lang) : getTranslation("status-ai-processing", lang);
        const statusText = doc.status === 'PROCESSED' ? getTranslation("status-pipe-success", lang) : doc.status === 'FAILED' ? getTranslation("status-pipe-error", lang) : getTranslation("status-pipe-pending", lang);

        tr.innerHTML = `
            <td class="fw-bold">#${doc.id}</td>
            <td class="text-start">${doc.filename}</td>
            <td>${new Date(doc.created_at).toLocaleString(lang === 'ja' ? 'ja-JP' : lang === 'hi' ? 'hi-IN' : 'en-US')}</td>
            <td><span class="badge-status ${s3Class}">${s3Text}</span></td>
            <td><span class="badge-status ${geminiClass}">${geminiText}</span></td>
            <td><span class="badge-status ${statusClass}">${statusText}</span></td>
        `;
        tableBody.appendChild(tr);
    });
}

/**
 * Fetch and Populate Recent Audit Logs in Sidebar
 */
function loadRecentLogs() {
    const logsContainer = document.getElementById("recent-logs-list");
    if (!logsContainer) return;

    fetch('/api/logs')
        .then(res => res.json())
        .then(logs => {
            logsContainer.innerHTML = "";
            const recentLogs = logs.slice(0, 4); // Show top 4 logs only
            const lang = localStorage.getItem("app_language") || "ja";

            if (recentLogs.length === 0) {
                const noLogsText = getTranslation("status-recent-no-data", lang);
                logsContainer.innerHTML = `<div class="text-center text-muted py-3 small">${noLogsText}</div>`;
                return;
            }

            recentLogs.forEach(log => {
                const logItem = document.createElement("div");
                logItem.className = "timeline-item pb-3 mb-3 border-bottom-dashed";
                
                let iconClass = "fa-circle-info text-primary";
                if (log.level === "ERROR") iconClass = "fa-circle-xmark text-danger";
                if (log.level === "WARNING") iconClass = "fa-triangle-exclamation text-warning";

                logItem.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="small fw-bold text-dark-blue"><code class="text-xs me-1">[${log.stage}]</code></span>
                        <span class="text-xs text-muted">${new Date(log.timestamp).toLocaleTimeString(lang === 'ja' ? 'ja-JP' : lang === 'hi' ? 'hi-IN' : 'en-US')}</span>
                    </div>
                    <p class="text-xs mb-0 text-muted d-flex align-items-start">
                        <i class="fa-solid ${iconClass} me-2 mt-1"></i>
                        <span>${escapeHtml(log.message)}</span>
                    </p>
                `;
                logsContainer.appendChild(logItem);
            });
        })
        .catch(err => {
            console.error("Error loading sidebar logs:", err);
            const lang = localStorage.getItem("app_language") || "ja";
            const failLogsText = lang === 'hi' ? "लॉग प्राप्त करने में त्रुटि" : lang === 'en' ? "Log fetch error" : "ログ取得エラー";
            logsContainer.innerHTML = `<div class="text-center text-danger py-3 small">${failLogsText}</div>`;
        });
}

function escapeHtml(text) {
    if (!text) return '';
    return text
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Fetch and Render Executive Dashboard Metrics
 */
function loadExecutiveDashboard() {
    fetch('/api/executive-dashboard')
        .then(response => response.json())
        .then(data => {
            // Update KPI numbers
            const totalInvoicesEl = document.getElementById("stat-total-invoices");
            const completedInvoicesEl = document.getElementById("stat-completed-invoices");
            const completedPercentEl = document.getElementById("stat-completed-percent");
            const avgConfidenceEl = document.getElementById("stat-avg-confidence");
            const complianceRateEl = document.getElementById("stat-compliance-rate");
            
            if (totalInvoicesEl) totalInvoicesEl.innerText = data.invoice_count.total;
            if (completedInvoicesEl) completedInvoicesEl.innerText = data.invoice_count.completed;
            
            const total = data.invoice_count.total;
            const completed = data.invoice_count.completed;
            const completedPct = total > 0 ? ((completed / total) * 100).toFixed(1) : "0.0";
            if (completedPercentEl) completedPercentEl.innerText = completedPct + "%";
            
            if (avgConfidenceEl) avgConfidenceEl.innerText = data.average_confidence.score + "%";
            if (complianceRateEl) complianceRateEl.innerText = data.compliance_rate.rate + "%";
            
            // Update Last Updated Timestamp
            const now = new Date();
            const lastUpdatedEl = document.getElementById("last-updated-time");
            const lang = localStorage.getItem("app_language") || "ja";
            const lastUpdatedPrefix = getTranslation("status-last-updated", lang);
            if (lastUpdatedEl) lastUpdatedEl.innerText = lastUpdatedPrefix + now.toLocaleTimeString(lang === 'ja' ? 'ja-JP' : lang === 'hi' ? 'hi-IN' : 'en-US');
            
            // Render Recent Uploads Table
            renderRecentUploadsTable(data.recent_uploads);
            
            // Render Plotly Charts
            renderMonthlySpendingChart(data.monthly_spending);
            renderVendorRankingChart(data.vendor_ranking);
            renderComplianceDistributionChart(data.compliance_rate);
        })
        .catch(err => console.error("Error loading executive dashboard metrics:", err));
}

function renderRecentUploadsTable(recentUploads) {
    const tableBody = document.getElementById("document-table-body");
    if (!tableBody) return;
    
    const lang = localStorage.getItem("app_language") || "ja";
    tableBody.innerHTML = "";
    if (recentUploads.length === 0) {
        const noUploadsText = getTranslation("status-recent-no-data", lang);
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4">${noUploadsText}</td></tr>`;
        return;
    }
    
    recentUploads.forEach(doc => {
        const tr = document.createElement("tr");
        
        const s3Class = doc.s3_key ? 'success' : 'pending';
        const s3Text = doc.s3_key ? getTranslation("status-s3-saved", lang) : getTranslation("status-s3-missing", lang);
        
        const statusClass = doc.status.toLowerCase() === 'processed' ? 'success' : 
                            doc.status.toLowerCase() === 'failed' ? 'failed' : 'pending';
        const statusText = doc.status === 'PROCESSED' ? getTranslation("status-pipe-success", lang) : 
                           doc.status === 'FAILED' ? getTranslation("status-pipe-error", lang) : getTranslation("status-pipe-running", lang);
        
        tr.innerHTML = `
            <td class="fw-bold">#${doc.id}</td>
            <td class="text-start">${escapeHtml(doc.filename)}</td>
            <td>${new Date(doc.created_at).toLocaleString(lang === 'ja' ? 'ja-JP' : lang === 'hi' ? 'hi-IN' : 'en-US')}</td>
            <td><span class="badge-status ${s3Class}">${s3Text}</span></td>
            <td><span class="badge-status ${statusClass}">${statusText}</span></td>
        `;
        tableBody.appendChild(tr);
    });
}

function renderMonthlySpendingChart(spendingData) {
    const chartEl = document.getElementById('chart-monthly-spending');
    if (!chartEl) return;
    
    const lang = localStorage.getItem("app_language") || "ja";
    const lblSpending = getTranslation("status-chart-monthly-spending-name", lang);
    const lblYaxis = getTranslation("status-chart-monthly-spending-yaxis", lang);

    const trace = {
        x: spendingData.months,
        y: spendingData.amounts,
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: '#0052cc', size: 8, line: { color: '#ffffff', width: 2 } },
        line: { color: '#0052cc', width: 3, shape: 'spline' },
        fill: 'tozeroy',
        fillcolor: 'rgba(0, 82, 204, 0.05)',
        name: lblSpending
    };
    
    const layout = {
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        margin: { t: 20, r: 20, b: 40, l: 60 },
        xaxis: {
            gridcolor: '#f1f3f5',
            tickfont: { color: '#495057', family: 'Inter, Noto Sans JP', size: 10 },
            showgrid: true,
            linecolor: '#dee2e6'
        },
        yaxis: {
            gridcolor: '#f1f3f5',
            tickfont: { color: '#495057', family: 'Inter, Noto Sans JP', size: 10 },
            showgrid: true,
            linecolor: '#dee2e6',
            title: { text: lblYaxis, font: { size: 10, color: '#64748b' } }
        },
        height: 280,
        showlegend: false
    };
    
    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot('chart-monthly-spending', [trace], layout, config);
}

function renderVendorRankingChart(rankingData) {
    const chartEl = document.getElementById('chart-vendor-ranking');
    if (!chartEl) return;
    
    // Copy arrays to prevent in-place mutation issues during refresh cycles
    const spendingCopy = [...rankingData.spending];
    const vendorsCopy = [...rankingData.vendors];

    const trace = {
        x: spendingCopy.reverse(),
        y: vendorsCopy.reverse(),
        type: 'bar',
        orientation: 'h',
        marker: {
            color: 'rgba(0, 82, 204, 0.85)',
            line: { color: '#0052cc', width: 1 }
        }
    };
    
    const layout = {
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        margin: { t: 20, r: 20, b: 40, l: 110 },
        xaxis: {
            gridcolor: '#f1f3f5',
            tickfont: { color: '#495057', family: 'Inter, Noto Sans JP', size: 10 },
            showgrid: true,
            linecolor: '#dee2e6'
        },
        yaxis: {
            tickfont: { color: '#495057', family: 'Inter, Noto Sans JP', size: 10 },
            showgrid: false,
            linecolor: '#dee2e6'
        },
        height: 280,
        showlegend: false
    };
    
    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot('chart-vendor-ranking', [trace], layout, config);
}

function renderComplianceDistributionChart(complianceData) {
    const chartEl = document.getElementById('chart-compliance-distribution');
    if (!chartEl) return;
    
    const lang = localStorage.getItem("app_language") || "ja";
    const lblHanko = getTranslation("status-chart-pie-hanko", lang);
    const lblNoHanko = getTranslation("status-chart-pie-nohanko", lang);

    const trace = {
        labels: [lblHanko, lblNoHanko],
        values: [complianceData.hanko_present, complianceData.hanko_missing],
        type: 'pie',
        hole: 0.6,
        marker: {
            colors: ['#0052cc', '#ff9900'] // primary, warning
        },
        textinfo: 'percent',
        textfont: { color: '#ffffff', family: 'Inter, Noto Sans JP', size: 10, weight: 'bold' },
        hoverinfo: 'label+value'
    };
    
    const layout = {
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#ffffff',
        margin: { t: 10, r: 10, b: 10, l: 10 },
        showlegend: true,
        legend: {
            x: 0.5,
            y: -0.1,
            xanchor: 'center',
            orientation: 'h',
            font: { color: '#495057', family: 'Inter, Noto Sans JP', size: 10 }
        },
        height: 240
    };
    
    const config = { responsive: true, displayModeBar: false };
    Plotly.newPlot('chart-compliance-distribution', [trace], layout, config);
}

/**
 * Handle Plotly Chart Resizing and Optimization for Printing
 */
window.addEventListener('beforeprint', () => {
    const containers = document.querySelectorAll('.plotly-chart-container');
    containers.forEach(container => {
        if (container.id && container.innerHTML.trim() !== '') {
            try {
                Plotly.relayout(container.id, {
                    width: 680,
                    'paper_bgcolor': '#ffffff',
                    'plot_bgcolor': '#ffffff'
                });
            } catch (err) {
                console.warn(`Failed to relayout chart ${container.id} for printing:`, err);
            }
        }
    });
});

window.addEventListener('afterprint', () => {
    const containers = document.querySelectorAll('.plotly-chart-container');
    containers.forEach(container => {
        if (container.id && container.innerHTML.trim() !== '') {
            try {
                Plotly.relayout(container.id, {
                    width: null, // Restores responsive/auto-sizing behavior
                    'paper_bgcolor': '#ffffff',
                    'plot_bgcolor': '#ffffff'
                });
            } catch (err) {
                console.warn(`Failed to restore chart ${container.id} after printing:`, err);
            }
        }
    });
});

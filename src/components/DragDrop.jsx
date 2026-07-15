import React, { useState, useRef } from 'react';

export default function DragDrop({ id, label = 'Attach Documents (Optional)', onFilesChange }) {
  const [files, setFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const triggerInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFiles = (newFiles) => {
    const fileList = [...newFiles];
    const updatedFiles = [...files, ...fileList];
    setFiles(updatedFiles);
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      // Reset input value to allow selecting same file again
      e.target.value = '';
    }
  };

  const removeFile = (indexToRemove, e) => {
    e.stopPropagation(); // prevent clicking triggers input
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    setFiles(updatedFiles);
    if (onFilesChange) {
      onFilesChange(updatedFiles);
    }
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <label style={{ display: 'block', fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '7px' }}>
        {label}
      </label>
      <div
        className={`upload-area ${isDragOver ? 'dragover' : ''}`}
        id={id}
        onClick={triggerInput}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        style={{ padding: '24px 16px' }}
      >
        <div className="upload-icon" style={{ width: '40px', height: '40px', marginBottom: '10px' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <div className="upload-title" style={{ fontSize: '14px' }}>Drop files here</div>
        <div className="upload-sub">
          or <strong>click to browse</strong> — RC, Insurance, Permit
        </div>
        <div className="upload-badge">PDF · JPG · PNG · Max 5MB</div>
      </div>
      
      <div className="upload-file-list" id={`${id}List`}>
        {files.map((file, i) => (
          <div key={i} className="upload-file-item">
            <div className="upload-file-ico">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <span className="fi-name">{file.name}</span>
            <span className="fi-size">{(file.size / 1024).toFixed(0)} KB</span>
            <button className="fi-remove" title="Remove" type="button" onClick={(e) => removeFile(i, e)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
      />
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, FileJson, Settings, ChevronDown, Download } from 'lucide-react';

const Controls = ({ indent, onIndentChange, output }) => {
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const indentOptions = [
    { value: 2, label: '2 Spaces' },
    { value: 4, label: '4 Spaces' },
    { value: 8, label: '8 Spaces' },
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        color: 'var(--text-secondary)',
        fontSize: '0.875rem',
      }}
    >
      <div style={{ position: 'relative' }} ref={menuRef}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            transition: 'all 0.2s',
          }}
        >
          <Settings size={16} />
          <span>Indent: {indent === 0 ? 'Minified' : `${indent} Spaces`}</span>
          <ChevronDown size={14} />
        </button>

        {isMenuOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              zIndex: 10,
              minWidth: '140px',
              overflow: 'hidden',
            }}
          >
            {indentOptions.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onIndentChange(option.value);
                  setIsMenuOpen(false);
                }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.5rem 1rem',
                  backgroundColor: indent === option.value ? 'var(--bg-primary)' : 'transparent',
                  color: indent === option.value ? 'var(--accent-color)' : 'var(--text-primary)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s',
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onIndentChange(0)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: indent === 0 ? 'var(--accent-color)' : 'transparent',
          color: indent === 0 ? '#fff' : 'var(--text-secondary)',
          border: indent === 0 ? 'none' : '1px solid var(--border-color)',
          padding: '0.25rem 0.75rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          transition: 'all 0.2s',
        }}
        title="Minify JSON"
      >
        <FileJson size={16} />
        Minify
      </button>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} />

      <button
        onClick={handleDownload}
        disabled={!output}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'transparent',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-color)',
          padding: '0.25rem 0.75rem',
          borderRadius: '4px',
          cursor: output ? 'pointer' : 'not-allowed',
          fontSize: '0.875rem',
          opacity: output ? 1 : 0.5,
          transition: 'all 0.2s',
        }}
        title="Download JSON"
      >
        <Download size={16} />
        Download
      </button>

      <button
        onClick={handleCopy}
        disabled={!output}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: copied ? 'var(--success-color)' : 'var(--accent-color)',
          color: copied ? '#fff' : '#fff',
          border: 'none',
          padding: '0.375rem 0.75rem',
          borderRadius: '4px',
          cursor: output ? 'pointer' : 'not-allowed',
          fontSize: '0.875rem',
          fontWeight: 500,
          opacity: output ? 1 : 0.5,
          transition: 'all 0.2s',
        }}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default Controls;

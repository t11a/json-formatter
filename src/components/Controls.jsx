import React, { useState } from 'react';
import { Copy, Check, FileJson } from 'lucide-react';

const Controls = ({ indent, onIndentChange, output }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem'
        }}>
            <span>Indent:</span>
            <select
                value={indent}
                onChange={(e) => onIndentChange(Number(e.target.value))}
                style={{
                    backgroundColor: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    outline: 'none',
                    cursor: 'pointer'
                }}
            >
                <option value={0}>Minified</option>
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
            </select>

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
                    transition: 'all 0.2s'
                }}
                title="Minify JSON"
            >
                <FileJson size={16} />
                Minify
            </button>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} />

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
                    transition: 'all 0.2s'
                }}
            >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

export default Controls;

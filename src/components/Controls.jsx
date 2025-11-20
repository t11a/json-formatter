import React from 'react';

const Controls = ({ indent, onIndentChange }) => {
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
                <option value={2}>2 Spaces</option>
                <option value={4}>4 Spaces</option>
                <option value={8}>8 Spaces</option>
            </select>
        </div>
    );
};

export default Controls;

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme for prism

const JsonEditor = ({ value, onChange, readOnly = false, title, error, errorLine }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                borderRight: '1px solid var(--border-color)',
                backgroundColor: readOnly ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                position: 'relative',
            }}
        >
            <div
                style={{
                    padding: '0.5rem 1rem',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: error ? 'var(--error-color)' : 'var(--text-secondary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-secondary)',
                }}
            >
                <span>{title}</span>
                {error && <span style={{ fontSize: '0.75rem' }}>Invalid JSON</span>}
            </div>
            <div style={{ flex: 1, overflow: 'auto', fontFamily: 'var(--font-mono)', display: 'flex' }}>
                <div
                    style={{
                        padding: '20px 10px 20px 20px',
                        textAlign: 'right',
                        color: 'var(--text-secondary)',
                        fontSize: 14,
                        fontFamily: 'var(--font-mono)',
                        lineHeight: '21px', // Matches prism-tomorrow theme line-height usually ~1.5
                        userSelect: 'none',
                        opacity: 0.5,
                        minHeight: '100%',
                        backgroundColor: readOnly ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                        position: 'sticky',
                        left: 0,
                    }}
                >
                    {value.split('\n').map((_, i) => (
                        <div
                            key={i}
                            style={{
                                color: errorLine === i + 1 ? 'var(--error-color)' : 'inherit',
                                fontWeight: errorLine === i + 1 ? 'bold' : 'normal'
                            }}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
                <Editor
                    value={value}
                    onValueChange={onChange}
                    highlight={code => highlight(code, languages.json)}
                    padding={20}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 14,
                        minHeight: '100%',
                        backgroundColor: 'transparent',
                        color: 'var(--text-primary)',
                        flex: 1,
                    }}
                    textareaClassName="focus:outline-none"
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
};

export default JsonEditor;

import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const JsonTreeNode = ({ name, value, isLast, depth = 0, indentWidth = 2 }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const isObject = value !== null && typeof value === 'object';
    const isArray = Array.isArray(value);
    const isEmpty = isObject && Object.keys(value).length === 0;

    const toggleExpand = (e) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    const renderValue = (val) => {
        if (val === null) return <span style={{ color: '#e06c75' }}>null</span>;
        if (typeof val === 'boolean') return <span style={{ color: '#e06c75' }}>{val.toString()}</span>;
        if (typeof val === 'number') return <span style={{ color: '#d19a66' }}>{val}</span>;
        if (typeof val === 'string') return <span style={{ color: '#98c379' }}>"{val}"</span>;
        return null;
    };

    // Calculate indent based on indentWidth.
    // Base unit 10px per indent level seems reasonable.
    // indentWidth 2 -> 20px, 4 -> 40px, 8 -> 80px per depth level might be too wide.
    // Let's try: depth * (indentWidth * 8) + 4
    const paddingLeft = depth * (indentWidth * 8);

    if (!isObject) {
        return (
            <div style={{ paddingLeft, display: 'flex', alignItems: 'center', lineHeight: '1.5' }}>
                {name && <span style={{ color: '#e5c07b', marginRight: '8px' }}>"{name}":</span>}
                {renderValue(value)}
                {!isLast && <span style={{ color: '#abb2bf' }}>,</span>}
            </div>
        );
    }

    const keys = Object.keys(value);
    const itemCount = keys.length;
    const brackets = isArray ? ['[', ']'] : ['{', '}'];

    return (
        <div style={{ lineHeight: '1.5' }}>
            <div
                onClick={toggleExpand}
                style={{
                    paddingLeft,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
            >
                <span style={{ width: '20px', display: 'inline-flex', alignItems: 'center', color: '#abb2bf' }}>
                    {!isEmpty && (isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />)}
                </span>
                {name && <span style={{ color: '#e5c07b', marginRight: '8px' }}>"{name}":</span>}
                <span style={{ color: '#abb2bf' }}>{brackets[0]}</span>
                {!isExpanded && (
                    <span style={{ color: '#5c6370', margin: '0 8px', fontSize: '0.85em' }}>
                        {isArray ? `Array(${itemCount})` : `Object{${itemCount}}`}
                    </span>
                )}
                {!isExpanded && <span style={{ color: '#abb2bf' }}>{brackets[1]}</span>}
                {!isExpanded && !isLast && <span style={{ color: '#abb2bf' }}>,</span>}
            </div>

            {isExpanded && !isEmpty && (
                <div>
                    {keys.map((key, index) => (
                        <JsonTreeNode
                            key={key}
                            name={isArray ? null : key}
                            value={value[key]}
                            isLast={index === keys.length - 1}
                            depth={depth + 1}
                            indentWidth={indentWidth}
                        />
                    ))}
                </div>
            )}

            {isExpanded && (
                <div style={{ paddingLeft: paddingLeft, color: '#abb2bf', display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '20px', display: 'inline-block' }}></span>
                    {brackets[1]}
                    {!isLast && <span>,</span>}
                </div>
            )}
        </div>
    );
};

const JsonTreeView = ({ data, title, indentWidth = 2 }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'var(--bg-secondary)',
            borderRight: '1px solid var(--border-color)',
        }}>
            <div style={{
                padding: '0.5rem 1rem',
                borderBottom: '1px solid var(--border-color)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-secondary)'
            }}>
                {title}
            </div>
            <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                color: '#abb2bf',
                backgroundColor: 'var(--bg-primary)' // Match editor background
            }}>
                {data ? (
                    <JsonTreeNode value={data} isLast={true} indentWidth={indentWidth} />
                ) : (
                    <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No valid JSON to display</div>
                )}
            </div>
        </div>
    );
};

export default JsonTreeView;

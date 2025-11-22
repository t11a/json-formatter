import React, { useState } from 'react';
import Layout from './components/Layout';
import JsonEditor from './components/JsonEditor';
import JsonTreeView from './components/JsonTreeView';
import Controls from './components/Controls';

const DEFAULT_JSON = `{
  "name": "JSON Formatter",
  "description": "Simple. Fast. Secure.",
  "features": [
    "Real-time Formatting",
    "Syntax Highlighting",
    "Error Detection"
  ],
  "active": true
}`;

function App() {
  const [input, setInput] = useState(DEFAULT_JSON);
  const [indent, setIndent] = useState(2);
  const [leftWidth, setLeftWidth] = useState(50); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState('text'); // 'text' or 'tree'

  const { output, error, errorLine, parsedData } = React.useMemo(() => {
    if (!input.trim()) {
      return { output: '', error: null, errorLine: null, parsedData: null };
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      return { output: formatted, error: null, errorLine: null, parsedData: parsed };
    } catch (err) {
      let line = null;
      // Chrome/V8 often gives "at position X"
      const match = err.message.match(/at position (\d+)/);
      if (match) {
        const position = parseInt(match[1], 10);
        // Calculate line number by counting newlines up to position
        line = input.substring(0, position).split('\n').length;
      } else {
        // Fallback: try to find "line X" if other browsers use that format
        const lineMatch = err.message.match(/line (\d+)/);
        if (lineMatch) {
          line = parseInt(lineMatch[1], 10);
        }
      }
      return { output: '', error: err.message, errorLine: line, parsedData: null };
    }
  }, [input, indent]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const containerWidth = window.innerWidth;
      const newLeftWidth = (e.clientX / containerWidth) * 100;

      // Limit width between 20% and 80%
      if (newLeftWidth >= 20 && newLeftWidth <= 80) {
        setLeftWidth(newLeftWidth);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Layout
      controls={
        <Controls
          indent={indent}
          onIndentChange={setIndent}
          output={output}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      }
    >
      <div style={{ display: 'flex', width: '100%', height: '100%', cursor: isDragging ? 'col-resize' : 'default' }}>
        <div style={{ width: `${leftWidth}%`, height: '100%' }}>
          <JsonEditor title="Input JSON" value={input} onChange={setInput} error={error} errorLine={errorLine} />
        </div>

        {/* Resizer Handle */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: '4px',
            backgroundColor: isDragging ? 'var(--accent-color)' : 'var(--border-color)',
            cursor: 'col-resize',
            height: '100%',
            transition: 'background-color 0.2s',
            zIndex: 10
          }}
          className="resizer"
        />

        <div style={{ width: `${100 - leftWidth}%`, height: '100%' }}>
          {viewMode === 'text' ? (
            <JsonEditor
              title="Formatted Output"
              value={output}
              onChange={() => { }} // Read only effectively
              readOnly={true}
            />
          ) : (
            <JsonTreeView title="Tree View" data={parsedData} indentWidth={indent} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;

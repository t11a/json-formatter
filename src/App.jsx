import React, { useState } from 'react';
import Layout from './components/Layout';
import JsonEditor from './components/JsonEditor';

const DEFAULT_JSON = `{
  "name": "JSON Formatter",
  "description": "Simple. Fast. Dark.",
  "features": [
    "Real-time Formatting",
    "Syntax Highlighting",
    "Error Detection"
  ],
  "active": true
}`;

function App() {
    const [input, setInput] = useState(DEFAULT_JSON);
    const { output, error } = React.useMemo(() => {
        if (!input.trim()) {
            return { output: '', error: null };
        }

        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            return { output: formatted, error: null };
        } catch (err) {
            return { output: '', error: err.message };
        }
    }, [input]);

    return (
        <Layout>
            <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                <div style={{ flex: 1, height: '100%' }}>
                    <JsonEditor
                        title="Input JSON"
                        value={input}
                        onChange={setInput}
                        error={error}
                    />
                </div>
                <div style={{ flex: 1, height: '100%' }}>
                    <JsonEditor
                        title="Formatted Output"
                        value={output}
                        onChange={() => { }} // Read only effectively
                        readOnly={true}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default App;

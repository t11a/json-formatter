import React from 'react';

const Layout = ({ children, controls }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      <header style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: 'var(--accent-color)' }}>
            JSON Formatter
          </h1>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Simple. Fast. Secure.
          </div>
        </div>
        <div>
          {controls}
        </div>
      </header>
      <main style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

import React from 'react';
import { createRoot } from 'react-dom/client';

import '@/globals.css';

import { appId, isDev, noStrictMode, versionInfo } from '@/config/env';
import { App } from '@/App';

const node = document.getElementById('root');

// eslint-disable-next-line no-console
console.warn(appId, versionInfo);

let content = <App />;

if (isDev && !noStrictMode) {
  content = (
    <React.StrictMode>
      {/* Wrap content in StrictMode if development mode */}
      {content}
    </React.StrictMode>
  );
}

createRoot(node!).render(content);

// DEBUG: Handle vite runtime errors
if (isDev) {
  const showErrorOverlay = (err: unknown) => {
    const ErrorOverlay = customElements.get('vite-error-overlay');
    if (!ErrorOverlay) return;
    const overlay = new ErrorOverlay(err);
    document.body.appendChild(overlay);
  };
  window.addEventListener('error', showErrorOverlay);
  window.addEventListener('unhandledrejection', ({ reason }) => showErrorOverlay(reason));
}

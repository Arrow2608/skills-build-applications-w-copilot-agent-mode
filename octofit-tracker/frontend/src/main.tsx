import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME ?? '';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App codespaceName={codespaceName} />
  </React.StrictMode>
);

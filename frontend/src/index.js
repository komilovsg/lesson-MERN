import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

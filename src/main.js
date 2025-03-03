import { jsx as _jsx } from "react/jsx-runtime";
//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';
createRoot(document.getElementById('root')).render(
// <StrictMode>
_jsx(App, {})
// </StrictMode>,
);

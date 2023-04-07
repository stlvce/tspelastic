import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material';

const mainTheme = createTheme({
    palette: {
        primary: {
            main: '#94B8C0',
        },
        secondary: {
            main: '#000'
        }
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={mainTheme}>
        <App />
    </ThemeProvider>
);

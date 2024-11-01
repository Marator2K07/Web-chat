import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { TipsProvider } from './contexts/TipsContext/TipsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<TipsProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</TipsProvider>
);
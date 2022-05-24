import * as React from 'react';
import './App.css';
import Index from './pages/Index.js';
import Business from './pages/Business';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="business" element={<Business />} />
			</Routes>
		</>
	);
}

export default App;

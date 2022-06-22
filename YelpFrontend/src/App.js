import * as React from 'react';
import './App.css';
import Index from './pages/Index.js';
import Business from './pages/Business';
import Statistics from './pages/Statistics';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="business" element={<Business />} />
				<Route path="statistics" element={<Statistics />} />
			</Routes>
		</>
	);
}

export default App;

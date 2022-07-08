import * as React from 'react';
import './App.css';
import Index from './pages/Index.js';
import Business from './pages/Business';
import Statistics from './pages/Statistics';
import { Routes, Route } from 'react-router-dom';
import { FilterContextProvider, useFilterContext } from "./hooks/use-filters";

function App() {
	return (
		<>

			<FilterContextProvider>
				<Routes>
					<Route path="/" element={<Index />} />
					<Route path="business" element={<Business />} />
					<Route path="statistics" element={<Statistics />} />
				</Routes>
			</FilterContextProvider>
		</>
	);
}

export default App;

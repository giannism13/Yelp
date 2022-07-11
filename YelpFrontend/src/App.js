import * as React from 'react';
import './App.css';
import Index from './pages/Index.js';
import Business from './pages/Business';
import Statistics from './pages/Statistics';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import { FilterContextProvider } from "./hooks/use-filters";
import Map from "./components/Map";

function App() {
	return (
		<>
			<FilterContextProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="index" element={<Index/>}/>
					<Route path="business" element={<Business />} />
					<Route path="statistics" element={<Statistics />} />
					<Route path="mapview" element={<Map />} />
				</Routes>
			</FilterContextProvider>
		</>
	);
}

export default App;

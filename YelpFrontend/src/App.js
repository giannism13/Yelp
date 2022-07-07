import * as React from "react";
import "./App.css";
import Index from "./pages/Index.js";
import Business from "./pages/Business";
import Statistics from "./pages/Statistics";
import { Routes, Route } from "react-router-dom";
import Map from "./components/Map";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="business" element={<Business />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="mapview" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;

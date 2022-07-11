import React, {useEffect, useState} from "react";
import { API_URL } from "../constants/constants";
import {
	Marker,
	GoogleMap,
	useJsApiLoader,
} from "@react-google-maps/api";

const AverageScores = () => {
	const [state, setState] = useState("PA");
	const [businessesScores, setBusinessesScores] = useState([]);
	const [cityAvgScores, setCityAvgScores] = useState({});
	const [cities, setCities] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/avgScore/?state=${state}`)
			.then(response => response.json())
			.then(
				data => {
					setBusinessesScores(data);
				});

		fetch(`${API_URL}/get_all_cities/${state}`)
			.then(response => response.json())
			.then(
				data => {
					setCities(data);
				});

		cities.forEach(city => {
			let cityDict = {city: 0}
			let scoresCount = 0;
			for (const score in businessesScores) {
				if (score["city"] === city) {
					cityDict[city] += score;
					scoresCount++;
				}
			}
			cityDict[city] /= scoresCount;
			console.log(cityDict)
		});
		
	},[state])

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyD3emDqMWl0lhG6fJs4xr4MNSokdPuJfsM",
	});
	
	
	const containerStyle = {
		width: "100vw",
		height: "100vh"
	};

	const center = {
		lat: 39.5,
		lng: -98.35
	};

	return (
		<div className="flex justify-center h-full w-full">
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4} key={"map"}/>
		</div>
  	);
}

export default AverageScores;
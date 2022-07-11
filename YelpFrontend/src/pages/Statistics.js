import React, { useState, useEffect } from "react";
import LocationSelect from "../components/LocationSelect";
import AttributeSelect from "../components/AttributeSelect";
//import AttributeValueSelect from "../components/AttributeValueSelect";
import { API_URL } from "../constants/constants";
import Barchart from "../components/Barchart";
import Piechart from "../components/Piechart";
//import HeatMap from "../components/HeatMap";
import Stats from "../components/Stats";
import AverageScores from "../components/AverageScores";


const Statistics = () => {

	const [state, setState] = useState("None");
	const [city, setCity] = useState("None");
	const [attribute, setAttribute] = useState("Alcohol");
	const [chartData, setChartData] = useState([]);

	const [barVisibility, setBarVisibility] = useState(true);
	const [pieVisibility, setPieVisibility] = useState(false);
	const [avgVisibity, setAvgVisibility] = useState(false);
	const [Top5Visibility, setTop5Visibility] = useState(false);

	const onPieClick = () => {
		setBarVisibility(false);
		setPieVisibility(true);
		//setHeatVisibility(false);
		setAvgVisibility(false);
	}

	const onBarClick = () => {
		setBarVisibility(true);
		setPieVisibility(false);
		setAvgVisibility(false);
		//setHeatVisibility(false);
	}

	const onAvgClick = () => {
		setBarVisibility(false);
		setPieVisibility(false);
		setAvgVisibility(true);
		//setHeatVisibility(false);
	}

	//const [attributeValue, setAttributeValue] = useState(null);
	//const [heatCoordinates, setHeatCoordinates] = useState([]);
	//const [heatVisibility, setHeatVisibility] = useState(false);

	// const onHeatClick = () => {
	// 	setBarVisibility(false);
	// 	setPieVisibility(false);
	// 	setHeatVisibility(true);

	// 	fetch(`${API_URL}/heatmap/${attribute}/${attributeValue}`)
	// 		.then(response => response.json())
	// 		.then(
	// 			data => {
	// 				setHeatCoordinates(data);
	// 			}
	// 		);
	// }

	useEffect(() => {
		if (attribute !== []) {
			if (state == null || state === "None") {
				fetch(`${API_URL}/statistics/${attribute}`)
					.then(response => response.json())
					.then(
						data => {
							setChartData(data);
						}
					);
			}
			else if (city == null || city === "None") {
				fetch(`${API_URL}/statistics/${state}/${attribute}`)
					.then(response => response.json())
					.then(
						data => {
							setChartData(data);
						}
					);
			}
			else {
				fetch(`${API_URL}/statistics/${state}/${city}/${attribute}`)
					.then(response => response.json())
					.then(
						data => {
							setChartData(data);
						}
					);
			}
		}
	}, [state, city, attribute])

	return (
		<div className="flex flex-no-wrap h-full" style={{ height: "100vh" }}>
			{/* Sidebar starts */}
			{/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
			<div className="w-64 absolute sm:relative bg-indigo-900 shadow md:h-full flex-col justify-between flex h-full">
				<div>
					<div className="h-16 w-full flex items-center px-8 text-6xl text-gray-100 justify-center">
						Statistics
					</div>
					<ul className="mt-12">
						<li className="flex w-full justify-between text-gray-400 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center py-3 px-8"
							onClick={onBarClick}>
							<div className="flex items-center">
								<span className="text-sm  ml-2">Barcharts</span>
							</div>
						</li>
						<li className="flex w-full justify-between text-gray-400 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3"
							onClick={onPieClick}>
							<div className="flex items-center">
								<span className="text-sm  ml-2">Piecharts</span>
							</div>
						</li>
						{/* <li className="flex w-full justify-between text-gray-400 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3"
							onClick={onHeatClick}>
							<div className="flex items-center">
								<span className="text-sm  ml-2">Heatmaps</span>
							</div>
						</li> */}
						<li className="flex w-full justify-between text-gray-400 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3"
						onClick={onAvgClick}>
							<div className="flex items-center">
								<span className="text-sm  ml-2">Average Scores</span>
							</div>
						</li>
					</ul>
				</div>
			</div>

			{/* Sidebar ends */}
			{/* Remove class [ h-64 ] when adding a card block */}
			<div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
				<div className="flex-wrap rounded">
					<AttributeSelect attribute={attribute} onAttributeChange={setAttribute} />
					{/* {heatVisibility ?
						<AttributeValueSelect attribute={attribute} attributeValue={attributeValue} onAttributeValueChange={setAttributeValue} />
						: <LocationSelect state={state} onStateChange={setState} city={city} onCityChange={setCity} />} */}
					<LocationSelect state={state} onStateChange={setState} city={city} onCityChange={setCity} />
				</div>
				{barVisibility ?
					<div className="w-full h-full rounded flex-none">
						<Barchart attribute={attribute} chartData={chartData} state={state} city={city} />
					</div>
					: null}

				{pieVisibility ?
					<div className="w-1/2 h-1/2 rounded flex-none m-auto">
						<Piechart attribute={attribute} chartData={chartData} state={state} city={city} />
					</div>
					: null}

				{avgVisibity ? 
					<div className="w-1/2 h-1/2 rounded flex-none m-auto">
						<AverageScores/>
					</div>
					: null}

				{/* {heatVisibility ?
					<div className="w-full h-full rounded flex-none">
						<HeatMap cooedinates={heatCoordinates} />
					</div>
					: null} */}
			</div>
		</div>
	);
}

export default Statistics;

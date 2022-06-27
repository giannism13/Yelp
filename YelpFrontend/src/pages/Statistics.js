import React from "react";
import { useState, useEffect } from "react";
import LocationSelect from "../components/LocationSelect";
import AttributeSelect from "../components/AttributeSelect";
import { API_URL } from "../constants/constants";
import Barchart from "../components/Barchart";
import Piechart from "../components/Piechart";

const Statistics = () => {

	const [state, setState] = useState(null);
	const [city, setCity] = useState(null);
	const [attribute, setAttribute] = useState("Alcohol");
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		if (attribute !== []) {
			console.log(attribute)
			if (state == null || state === "None") {
				fetch(`${API_URL}/statistics/${attribute}`)
					.then(response => response.json())
					.then(
						data => {
							console.log("Before: " + data);
							// data.array.forEach(element => {
							// 	element[attribute].replace("\"" + attribute + "\":", "\"attribute\":");
							// });
							setChartData(data);
							console.log("After: " + data);
						}
					);
			}
			else if (city == null || city === "None") {
				fetch(`${API_URL}/statistics/${state}/${attribute}`)
					.then(response => response.json())
					.then(
						data => {
							console.log("Before: " + data);
							// data.array.forEach(element => {
							// 	element[attribute].replace("\"" + attribute + "\":", "\"attribute\":");
							// });
							setChartData(data);
							console.log("After: " + data);
						}
					);
			}
			else {
				fetch(`${API_URL}/statistics/${state}/${city}/${attribute}`)
					.then(response => response.json())
					.then(
						data => {
							console.log("Before: " + data);
							// data.array.forEach(element => {
							// 	element[attribute].replace("\"" + attribute + "\":", "\"attribute\":");
							// });
							setChartData(data);
							console.log("After: " + data);
						}
					);
			}
			console.log("Chartdata: " + chartData)
		}
	}, [state, city, attribute])

	return (
		<div className="flex flex-no-wrap h-full" style={{ height: "100vh" }}>
			{/* Sidebar starts */}
			{/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
			<div className="w-64 absolute sm:relative bg-indigo-900 shadow md:h-full flex-col justify-between hidden sm:flex h-full">
				<div>
					<div className="h-16 w-full flex items-center px-8">
						{/*============================ TITLOS========================*/}
					</div>
					<ul className="mt-12">
						<li className="flex w-full justify-between text-gray-400 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center py-3 px-8">
							<div className="flex items-center">
								<span className="text-sm  ml-2">Barcharts</span>
							</div>
						</li>
						<li className="flex w-full justify-between text-gray-400 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
							<div className="flex items-center">
								<span className="text-sm  ml-2">Piecharts</span>
							</div>
						</li>
						<li className="flex w-full justify-between text-gray-400 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
							<div className="flex items-center">
								<span className="text-sm  ml-2">Heatmaps</span>
							</div>
						</li>
						<li className="flex w-full justify-between text-gray-400 hover:text-gray-300 hover:bg-indigo-800 cursor-pointer items-center px-8 py-3">
							<div className="flex items-center">
								<span className="text-sm  ml-2">Top 5 Lists</span>
							</div>
						</li>
					</ul>
				</div>
			</div>

			{/* Sidebar ends */}
			{/* Remove class [ h-64 ] when adding a card block */}
			<div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
				{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
				<div className="w-full h-full rounded border-dashed border-2 border-gray-300">{/* Place your content here */}
					<LocationSelect state={state} onStateChange={setState} city={city} onCityChange={setCity} />
					<AttributeSelect attribute={attribute} onAttributeChange={setAttribute} />
				</div>
			</div>

			<div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
				{/* Remove class [ border-dashed border-2 border-gray-300 ] to remove dotted border */}
				<div className="w-full h-full rounded border-dashed border-2 border-gray-300">{/* Place your content here */}
					<Barchart attribute={attribute} chartData={chartData} />
				</div>
				<div className="w-full h-full rounded border-dashed border-2 border-gray-300">{/* Place your content here */}
					<Piechart attribute={attribute} chartData={chartData} />
				</div>
			</div>
		</div>
	);
}

export default Statistics;

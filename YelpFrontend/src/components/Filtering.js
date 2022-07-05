import React, { useState, useEffect } from "react";
import FilterSelector from "./FilterSelector";

const Filtering = (props) => {
	const { showFilters } = props

	const [check, setCheck] = useState({
		leather: false,
		cotton: false,
		fabric: false,
		crocodile: false,
		wool: false,
		large: false,
		medium: false,
		small: false,
		mini: false,
		luxesignatire: false,
		luxelondon: false,
	});

	const { leather, cotton, fabric, crocodile, wool, large, medium, small, mini, luxesignatire, luxelondon } = check;

	const changeHandler = (e) => {
		setCheck({
			...check,
			[e.target.name]: e.target.checked,
		});
	};

	const applyFilters = (e) => {
		setCheck({
			...check,
			leather: false,
			cotton: false,
			fabric: false,
			crocodile: false,
			wool: false,
			large: false,
			medium: false,
			small: false,
			mini: false,
			luxesignatire: false,
			luxelondon: false,
		});
	};

	const filters = [
		"Alcohol",
		"BikeParking",
		"NoiseLevel",
		"RestaurantsAttire",
		"RestaurantsPriceRange",
		"Smoking",
		"WiFi"
	]

	return (
		<div className="2xl:container 2xl:mx-auto" >
			<div id="filterSection" className={"relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full " + (showFilters ? "block" : "hidden")} >
				{filters.map((filter, idx) => (
					<FilterSelector key={`${filter}-filter-${idx}`} filterName={filter} />
				))}
				<div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6" >
					<button onClick={applyFilters} className="w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" >Apply Filter </button>
				</div>
			</div>
		</div>
	);
};

export default Filtering;
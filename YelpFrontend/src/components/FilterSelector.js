import React, { useState, useEffect } from "react";
import FilterCheckbox from "./FilterCheckbox";
import { API_URL } from "../constants/constants";

const FilterSelector = (props) => {
	const { filterName } = props;

	const [filterValues, setFilterValues] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/get-all-values/${filterName}`)
			.then(response => response.json())
			.then(
				data => {
					setFilterValues(data);
				}
			);
	}, []);

	return (
		<div >
			<div className=" flex space-x-2" >
				<p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800">{filterName}</p>
			</div>
			<div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" >
				<div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start">
					{
						filterValues.map((value, idx) => (
							<FilterCheckbox key={`${value}-checkbox-${idx}`} value={value} />
						))}
				</div>
			</div>
			<hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />
		</div>
	)
};

export default FilterSelector;
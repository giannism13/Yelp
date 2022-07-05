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
			<div className=" md:flex md:space-x-6 mt-4 grid grid-cols-3 gap-y-4 flex-wrap" >
				<div className=" flex flex-wrap justify-start w-full">
					{filterValues.map((value, idx) => (
						<FilterCheckbox key={`${value}-checkbox-${idx}`} value={value} name={filterName} />
					))}
				</div>
			</div>
			<hr className=" bg-gray-200 lg:w-6/12 w-full md:my-8 my-4" />
		</div>
	)
};

export default FilterSelector;
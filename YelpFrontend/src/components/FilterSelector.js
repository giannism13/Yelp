import React from "react";
import FilterCheckbox from "./FilterCheckbox";
import { useFilterContext } from "../hooks/use-filters";

const FilterSelector = (props) => {
	const { category } = props;
	const { filterValues, setFilterValue } = useFilterContext();
	const filters = Object.keys(filterValues[category]);

	return (
		<div >
			<div className=" flex space-x-2" >
				<p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800">{category}</p>
			</div>
			<div className=" md:flex md:space-x-6 mt-4 grid grid-cols-3 gap-y-4 flex-wrap" >
				<div className=" flex flex-wrap justify-start w-full">
					{filters.map((filter, idx) => (
						<FilterCheckbox key={`${filter}-checkbox-${idx}`} onChange={(e) => { setFilterValue(category, filter, !!!filterValues[category][filter]) }} label={filter} />
					))}
				</div>
			</div>
			<hr className=" bg-gray-200 lg:w-6/12 w-full md:my-8 my-4" />
		</div>
	)
};

export default FilterSelector;
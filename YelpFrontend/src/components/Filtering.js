import React from "react";
import { useFilterContext } from "../hooks/use-filters";
import FilterSelector from "./FilterSelector";


const Filtering = (props) => {
	const { showFilters } = props;
	const { filterValues } = useFilterContext();
	const categories = Object.keys(filterValues)

	return (
		<div id="filterSection" className={"relative flex flex-col overflow-y-scroll md:py-10 lg:px-10 md:px-3 py-9 px-4 bg-gray-50 w-full " + (showFilters ? "block" : "hidden")} style={{ height: 'calc(100vh - 6rem)' }} >
			{categories.map((category, idx) => (
				<FilterSelector key={`${category}-filter-${idx}`} category={category} />
			))}
		</div>
	);
};

export default Filtering;
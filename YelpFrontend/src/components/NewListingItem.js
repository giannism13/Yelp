import React from "react";
import placeholder from "../../src/placeholder.jpg"

function NewListingItem(props) {
	return (
		<div className="flex items-center justify-between w-50%">
			<div className="flex flex-col lg:flex-row w-full items-start lg:items-center rounded bg-white shadow">
				<div className="w-full lg:w-1/3 h-24 lg:h-64 border-t lg:border-t-0 lg:border-r lg:border-l lg:rounded-r bg-gray-100">
					<img src={placeholder} width="50%" height="50%" />
				</div>
				<div className="w-full lg:w-2/3 h-64">
					<h1>{props.listingItem.name}</h1>
					<h2>{props.listingItem.stars} / {props.listingItem.review_count}</h2>
				</div>
			</div>
		</div>
	);
}
export default NewListingItem;
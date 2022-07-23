import React, { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";
import ListingItem from "./ListingItem";

const Top5List = (props) => {
	const { state, city } = props;
	const [list, setList] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/get_top_5/${state}/${city}`)
			.then((response) => response.json())
			.then((data) => {
				setList(data);
			});
	}, [state, city]);

	return (
		<div className="flex flex-col place-content-center">
			{
				list.map((listingItem, idx) => (
					<ListingItem key={`listing-item-${listingItem.name}-${idx}`} listingItem={listingItem} />
				))
			}
		</div>
	);
}

export default Top5List;
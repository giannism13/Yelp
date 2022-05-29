import React, { useCallback } from "react";
import placeholder from "../../src/placeholder.jpg"
import star from "../../src/star.png"
import { useNavigate } from 'react-router-dom';


function ListingItem(props) {
	const { listingItem } = props;
	const navigate = useNavigate();
	const onClick = useCallback(() => {
		navigate(`/business?id=${listingItem.business_id}`);
	}, [navigate, listingItem])

	return (
		<div className="flex justify-center">
			<div className="flex justify-center cursor-pointer m-5 rounded-lg bg-white shadow-xl overflow-hidden w-full max-w-6xl" onClick={onClick}>
				<div className="flex flex-col lg:flex-row w-full items-start lg:items-center rounded">
					<div style={{ backgroundImage: `url(${placeholder})` }} className="w-64 h-24 lg:h-48 bg-gray-100 bg-center bg-cover bg-no-repeat	">
					</div>
					<div className="w-full lg:w-2/3 h-48 p-5">
						<h1><span className="text-2xl"><b>{listingItem.name}</b></span></h1>
						<div><span class="inline"><img src={star} /> {listingItem.stars}  ({listingItem.review_count})</span></div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ListingItem;
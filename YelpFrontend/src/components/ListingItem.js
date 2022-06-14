import React, { useCallback, useEffect, useState } from "react";
import star from "../../src/star.png"
import { useNavigate } from 'react-router-dom';


function ListingItem(props) {
	const { listingItem } = props;
	const navigate = useNavigate();
	const [cover, setCover] = useState([]);

	const onClick = useCallback(() => {
		navigate(`/business?id=${listingItem.business_id}`);
	}, [navigate, listingItem])

	useEffect(() => {
		fetch(`http://localhost:3001/imgFilenames/${listingItem.business_id}/?q=1`)
			.then(response => response.json())
			.then(
				data => {
					setCover(data);
					console.log(data);
				}
			);
	}, [listingItem.business_id]);

	return (
		<div className="flex justify-center">
			<div className="flex justify-center cursor-pointer m-5 rounded-lg bg-white shadow-xl overflow-hidden w-full max-w-6xl" onClick={onClick}>
				<div className="flex flex-col lg:flex-row w-full items-start lg:items-center rounded">
					<div style={{ backgroundImage: `url(http://localhost:3001/images/${cover.photo_id}.jpg)` }} className="w-64 h-24 lg:h-48 bg-gray-100 bg-center bg-cover bg-no-repeat	">
					</div>
					<div className="w-full lg:w-2/3 h-48 p-5">
						<h1><span className="text-2xl"><b>{listingItem.name}</b></span></h1>
						<div className="flex flex-row space-x-1">
							<img src={star} alt="" />
							<p className="pt-1 font-bold">{listingItem.stars}</p>
							<p className="pt-1 text-gray-500">({listingItem.review_count})</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default ListingItem;
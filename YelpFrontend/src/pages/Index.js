import { useState, useEffect } from "react"
import Layout from '../components/Layout.js';
import ListingItem from '../components/ListingItem.js';
import Search from "../components/Search.js";

function Index() {
	const [listingItems, setListingItems] = useState([]);

	const onSearchAction = (searchQuery) => {
		if (searchQuery.length >= 3) {
			fetch(`http://localhost:3001/search?q=${searchQuery}`)
				.then(response => response.json())
				.then(data => setListingItems(data));
		}
	}

	return (
		<Layout>
			<Search onSearchAction={onSearchAction}></Search>
			<div className="flex-column place-content-center overflow-hidden">
				{
					listingItems.map((listingItem, idx) =>
					(
						<ListingItem key={`listing-item-${idx}`} listingItem={listingItem} />
					)
					)
				}
			</div>
		</Layout>
	);
}

export default Index;
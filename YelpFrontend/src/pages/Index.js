import { useState, useEffect } from "react"
import Layout from '../components/Layout.js';
import NewListingItem from '../components/NewListingItem.js';
import NewSearch from "../components/NewSearch.js";

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
			<NewSearch onSearchAction={onSearchAction}></NewSearch>
			{
				listingItems.map((listingItem) =>
					<NewListingItem listingItem={listingItem} />
				)
			}
		</Layout>
	);
}

export default Index;
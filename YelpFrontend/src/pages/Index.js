import { useState, useEffect } from "react"
import Layout from '../components/Layout.js';
import Searchbar from '../components/Searchbar.js';
import ListingItem from '../components/ListingItem.js';

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
            <Searchbar onSearchAction={onSearchAction}></Searchbar>
            {
                listingItems.map((listingItem) =>
                    <ListingItem listingItem={listingItem} />
                )
            }
        </Layout>
    );
}

export default Index;
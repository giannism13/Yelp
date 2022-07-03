import { useState, useCallback, useEffect } from "react"
import Layout from '../components/Layout.js';
import ListingItem from '../components/ListingItem.js';
import Search from "../components/Search.js";
import { usePagination } from "../hooks/use-pagination";
import { useQuery } from "../hooks/use-query";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../constants/constants";

const Index = (props) => {
	const [listingItems, setListingItems] = useState([]);
	const { page,
		pageSize,
		count,
		pageData,
		goToPage,
		pageCount } = usePagination(listingItems);

	const onSearchAction = useCallback((searchQuery) => {
		if (searchQuery.length >= 3) {
			fetch(`http://localhost:3001/search?q=${searchQuery}`)
				.then(response => response.json())
				.then(data => {
					goToPage(1);
					setListingItems(data);
				});
		}
	}, [goToPage])

	const navigate = useNavigate();
	const onClick = useCallback(() => {
		navigate(`/Statistics`);
	}, [navigate])

	const query = useQuery();
	useEffect(() => {
		if (query.get('attribute')) {
			fetch(`${API_URL}/searchExt/?state=${query.get('state')}&city=${query.get('city')}&attribute=${query.get('attribute')}&attributeValue=${query.get('attributeValue')}`)
				.then(response => response.json())
				.then(data => {
					setListingItems(data);
				})
		}
	}, [])

	return (
		<Layout>

			<div className="flex justify-center items-center w-full gap-4 lg:flex-row md:flex-col bg-indigo-300 shadow-md fixed">
				<div className="flex w-1/6 items-center" />
				<div className="flex-auto w-2/3">
					<Search onSearchAction={onSearchAction} />
				</div>
				<div className="flex w-1/6 justify-end">
					<button onClick={onClick} className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600
			 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm">Statistics</button>
				</div>
			</div >
			<div>
				<div className="h-36" />
				<div className="flex-column place-content-center overflow-hidden">
					{
						pageData.map((listingItem, idx) =>
						(
							<ListingItem key={`listing-item-${listingItem.name}-${idx}`} listingItem={listingItem} />
						)
						)
					}
				</div>
			</div>
			{pageCount > 1 && (<div className="flex justify-center items-center w-full place-content-center overflow-hidden">
				<button onClick={() => goToPage(page - 1)} className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600
			 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm">Previous</button>

				{page}/{pageCount}
				<button onClick={() => goToPage(page + 1)} className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600
			 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm">Next</button>

			</div>)}

		</Layout>
	);
}

export default Index;
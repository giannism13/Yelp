import { useState, useCallback, useEffect } from "react"
import Layout from '../components/Layout.js';
import ListingItem from '../components/ListingItem.js';
import Search from "../components/Search.js";
import { usePagination } from "../hooks/use-pagination";
import { useQuery } from "../hooks/use-query";
import { useNavigate } from 'react-router-dom';
import { API_URL } from "../constants/constants";
import Filtering from "../components/Filtering.js";

const Index = (props) => {
	const [listingItems, setListingItems] = useState([]);
	const {
		page,
		pageSize,
		count,
		pageData,
		goToPage,
		pageCount
	} = usePagination(listingItems);

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

	const [showFilters, setShowfilters] = useState(true);

	return (<Layout>

		<div className="flex justify-center items-center w-full gap-4 lg:flex-row md:flex-col bg-indigo-300 shadow-md fixed" >
			<div className="flex w-1/6 items-center" >
				<button onClick={() => setShowfilters(!showFilters)} className=" cursor-pointer sm:flex hidden hover:bg-gray-700 focus:ring focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center ">
					<svg className=" mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M6 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M6 12V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M12 4V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M12 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M18 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M18 9V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					Filters
				</button>
			</div>
			<div className="flex-auto w-2/3" >
				<Search onSearchAction={onSearchAction} />
			</div>
			<div className="flex w-1/6 justify-end" >
				<button onClick={onClick} className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm ">Statistics</button>
			</div>
		</div>

		<div>
			<div className="h-36" />
			<div>
				<Filtering showFilters={showFilters} />
			</div>
			<div className="flex-column place-content-center overflow-hidden"> {
				pageData.map((listingItem, idx) =>
				(
					<ListingItem key={`listing-item-${listingItem.name}-${idx}`} listingItem={listingItem} />
				))}
			</div>
		</div> {
			pageCount > 1 && (< div className="flex justify-center items-center w-full place-content-center overflow-hidden" >
				<button onClick={() => goToPage(page - 1)} className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm ">Previous</button>
				{page}/{pageCount}
				<button onClick={() => goToPage(page + 1)} className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm ">Next</button>
			</div>)}

	</Layout>
	);
}

export default Index;
import { useState, useCallback, useEffect, useMemo } from "react"
import Layout from '../components/Layout.js';
import ListingItem from '../components/ListingItem.js';
import Search from "../components/Search.js";
import { usePagination } from "../hooks/use-pagination";
import { useQuery } from "../hooks/use-query";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/constants";
import Filtering from "../components/Filtering.js";
import { useFilterContext } from "../hooks/use-filters";
import { usePrevious } from "../hooks/use-previous";
import Map from "../components/Map.js";
import LocationSelect from "../components/LocationSelect.js";
import { useSearchParams } from 'react-router-dom';

const Index = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [listingItems, setListingItems] = useState([]);
	const [state, setState] = useState(searchParams.get("state") ?? "None");
	const [city, setCity] = useState(searchParams.get("city") ?? "None");
	const prevState = usePrevious(state);

	const { filterValues } = useFilterContext();

	const filteredListingItems = useMemo(() => {
		const filteredListingItems = listingItems.filter((item) => {
			if (filterValues) {
				const valueSets = Object.entries(filterValues);
				return valueSets.every(([category, valueSet]) => {
					for (const property of Object.keys(valueSet)) {
						if (item[category] === '' || valueSet[item[category]]) {
							return true;
						}
					}
					return false
				})
			}

			return true;
		})
		return filteredListingItems;
	}, [listingItems, filterValues])



	const {
		page,
		pageSize,
		count,
		pageData,
		goToPage,
		pageCount
	} = usePagination(filteredListingItems);

	const onSearchAction = useCallback(
		(searchQuery) => {
			if (searchQuery.length >= 3) {
				fetch(`http://localhost:3001/search?q=${searchQuery}&state=${state}&city=${city}`)
					.then((response) => response.json())
					.then((data) => {
						goToPage(1);
						setListingItems(data);
					});
			}
		},
		[goToPage, city, state]
	);


	const navigate = useNavigate();
	const onClick = useCallback(() => {
		navigate(`/Statistics`);
	}, [navigate]);

	const query = useQuery();

	useEffect(() => {
		if (query.get("attribute")) {
			fetch(
				`${API_URL}/searchExt/?state=${query.get("state")}&city=${query.get(
					"city"
				)}&attribute=${query.get("attribute")}&attributeValue=${query.get(
					"attributeValue"
				)}`
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setListingItems(data);
				});
		}
	}, []);

	useEffect(() => {
		console.log({ prev: prevState, current: state });
		if (prevState)
			setCity("None");
	}, [state]);

	const [showFilters, setShowfilters] = useState(false);

	const [showMap, setShowMap] = useState(false);

	return (
		<Layout>
			<div className="flex justify-center items-center w-full gap-4 lg:flex-row md:flex-col bg-indigo-300 shadow-md fixed z-50">
				<div className="flex w-1/6 items-center">
					<button
						onClick={() => setShowfilters(!showFilters)}
						className=" cursor-pointer sm:flex hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 py-4 px-6 bg-gray-800 flex text-base leading-4 font-normal text-white justify-center items-center ">
						<svg className=" mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
							<path d="M6 12C7.10457 12 8 11.1046 8 10C8 8.89543 7.10457 8 6 8C4.89543 8 4 8.89543 4 10C4 11.1046 4.89543 12 6 12Z"
								stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M6 4V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M6 12V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z"
								stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12 4V14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M12 18V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M18 9C19.1046 9 20 8.10457 20 7C20 5.89543 19.1046 5 18 5C16.8954 5 16 5.89543 16 7C16 8.10457 16.8954 9 18 9Z"
								stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M18 4V5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M18 9V20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						Filters
					</button>
				</div>
				<div>
					<LocationSelect state={state} onStateChange={setState} city={city} onCityChange={setCity} />
				</div>
				<div className="flex-auto w-2/3">
					<Search onSearchAction={onSearchAction} state={state} city={city} />
				</div>
				<div className="flex w-1/6 justify-end">
					<button onClick={() => setShowMap(!showMap)}
						className="mx-2 my-2 bg-gray-300 transition duration-150 ease-in-out hover:bg-gray-400 rounded text-indigo-700 px-8 py-3 text-sm">
						Show/Hide Map
					</button>
				</div>
				<div className="flex w-1/6 justify-end">
					<button onClick={onClick}
						className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm ">
						Statistics
					</button>
				</div>
			</div>

			<div className="flex flex-row pt-24">
				<div className={`sticky h-full self-start top-24 ${showFilters ? "w-1/4" : "hidden"}`}>
					<Filtering showFilters={showFilters} />
				</div>


				<div className={`flex flex-col place-content-center overflow-hidden ${showFilters && showMap ? "w-2/4" : showFilters || showMap ? "w-3/4" : "w-full"}`}>
					{pageData.map((listingItem, idx) => (
						<ListingItem key={`listing-item-${listingItem.name}-${idx}`} listingItem={listingItem} />
					))}
					{pageCount > 1 && (
						<div className="flex justify-center items-center w-full place-content-center overflow-hidden">
							<button
								onClick={() => goToPage(page - 1)}
								className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600
			 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm">
								Previous
							</button>
							{page}/{pageCount}
							<button
								onClick={() => goToPage(page + 1)}
								className="mx-2 my-2 bg-white transition duration-150 ease-in-out hover:border-indigo-600
			 hover:text-indigo-600 rounded border border-indigo-700 text-indigo-700 px-8 py-3 text-sm">
								Next
							</button>
						</div>
					)}
				</div>
				{(pageData.length > 0) && (showMap) ?
					<div className="sticky h-full self-start top-24 w-1/4 p-3">
						<div className="flex justify-center cursor-pointer rounded-lg bg-white shadow-xl overflow-hidden w-full">
							<div className="flex flex-col lg:flex-row w-full items-start lg:items-center rounded ">
								<Map data={pageData} zoom={3} />
							</div>
						</div>
					</div>
					: null}
			</div>
		</Layout>
	);
};

export default Index;

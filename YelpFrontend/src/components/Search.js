import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from 'react-router-dom';

const SEARCH_QUERY_PARAM = 'search'

const Search = (props) => {
	const { onSearchAction, state, city } = props;

	const [searchParams, setSearchParams] = useSearchParams();
	const [searchContent, setSearchContent] = useState(searchParams.get(SEARCH_QUERY_PARAM) ?? "");
	const onFormSubmit = useCallback(() => {
		setSearchParams({ [SEARCH_QUERY_PARAM]: searchContent, state: searchParams.get('state'), city: searchParams.get('city'), attribute: searchParams.get('attribute'), attributeValue: searchParams.get('attributeValue'), });
		onSearchAction(searchContent);
	}, [searchContent, onSearchAction, setSearchParams]);

	useEffect(() => {
		onFormSubmit();
	}, [])

	useEffect(() => {
		onFormSubmit();
	}, [state, city])

	return (
		<form className="sticky top-0 left-0 right-0" onSubmit={(e) => { e.preventDefault(); onFormSubmit(); }}>
			<div className="flex flex-col w-full gap-4 lg:flex-row md:flex-col p-7 justify-center">
				<div className="flex">
					<div className="relative lg:max-w-[410px] w-full ">
						<input id="searchInput" placeholder="Search"
							className="p-4 py-3 outline-none focus pr-10  bg-gray-100 border rounded border-gray-100 text-slate-600  lg:max-w-[410px] w-full leading-4"
							value={searchContent}
							onChange={(e) => setSearchContent(e.target.value)}>
						</input>
						<svg className="absolute pointer-events-none top-3 right-5 " width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#4B5563" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M21 21L15 15" stroke="#4B5563" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
				</div>
				<div className="flex">
					<input className="bg-indigo-700  text-white lg:max-w-[164px] font-medium px-6 py-4 w-full  rounded-[4px] leading-[14px] hover:bg-indigo-600"
						id="searchButton"
						type="submit"
						value="Submit"
					/>
				</div>
			</div >
		</form >

	);
}

export default Search;

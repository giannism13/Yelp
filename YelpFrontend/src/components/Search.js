import { useEffect, useState } from "react";


function Search(props) {
	const [visibility, setVisibility] = useState(true);
	const [searchContent, setSearchContent] = useState("");
	const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);

	useEffect(() => {

	})

	function showOptions(e) {
		const options = document.getElementById("interaction");
		options.classList.toggle("hidden");
		document.getElementsByClassName("flex flex-wrap justify-between pb-2 lg:flex-nowrap").classList.toggle("hidden");
	}





	const plusme = (el) => {

		let currentValue = parseInt(el.target.parentElement.parentElement.children[2].innerText);

		el.target.parentElement.parentElement.children[2].innerText = currentValue + 1000;
	}
	const minusme = (el) => {
		let currentValue = parseInt(el.target.parentElement.parentElement.children[2].innerText);
		if (currentValue > 0) {
			el.target.parentElement.parentElement.children[2].innerText = currentValue - 1000;
		}
	}


	function showDropDownMenu(el) {
		el.target.parentElement.children[1].classList.toggle("hidden");
	}
	function swaptext(el) {
		const targetText = el.target.innerText;
		document.getElementById("drop-down-content-setter").innerText =
			targetText;
		document.getElementById("drop-down-div").classList.toggle("hidden");

	}
	function showDropDownMenuOne(el) {
		el.target.parentElement.children[1].classList.toggle("hidden");
	}
	function swaptextone(el) {
		const targetText = el.target.innerText;
		document.getElementById("drop-down-content-setter-one").innerText =
			targetText;
		document.getElementById("drop-down-div-one").classList.toggle("hidden");

	}
	function showDropDownMenutwo(el) {
		el.target.parentElement.children[1].classList.toggle("hidden");
	}
	function swaptexttwo(el) {
		const targetText = el.target.innerText;
		document.getElementById("drop-down-content-setter-two").innerText =
			targetText;
		document.getElementById("drop-down-div-two").classList.toggle("hidden");

	}


	return (
		<>
			<div>
				<div className=" pb-10 mt-12 px-7" id="interaction">
					{!isAdvancedSearchOpen ?
						(
							<form onSubmit={(e) => { e.preventDefault(); props.onSearchAction(searchContent); }} ><div className="flex flex-wrap justify-between pb-2 lg:flex-nowrap">
								<div className="flex flex-col w-full gap-4 lg:flex-row md:flex-col p-7">
									<div className="relative lg:max-w-[410px] w-full">
										<input id="searchInput" placeholder="Search"
											className="p-4 py-3 outline-none focus pr-10  bg-gray-100 border rounded border-gray-100 text-slate-600  lg:max-w-[410px] w-full leading-4"
											onChange={(e) => setSearchContent(e.target.value)}>
										</input>
										<svg className="absolute pointer-events-none top-3 right-5 " width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#4B5563" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M21 21L15 15" stroke="#4B5563" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</div>
									<input className="bg-indigo-700  text-white lg:max-w-[164px] font-medium px-6 py-4 w-full  rounded-[4px] leading-[14px] hover:bg-indigo-600"
										id="searchButton"
										type="submit"
										value="Submit"
									></input>
								</div>
								<button onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)} className="text-indigo-700 hover:text-indigo-800 w-full lg:max-w-[200px] flex justify-end items-center gap-3  font-medium pr-7">
									Advanced Search <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M8.00011 2.06433L13.5608 7.62499L12.5001 8.68565L8.00011 4.18565L3.50011 8.68565L2.43945 7.62499L8.00011 2.06433Z" fill="#4338CA" />
										<path fillRule="evenodd" clipRule="evenodd" d="M8.75 3V13.625H7.25V3H8.75Z" fill="#4338CA" />
									</svg>
								</button>
							</div>
							</form>) :
						(
							<>
								<div className="grid gap-10 mt-12 md:grid-cols-1 lg:grid-cols-2">
									<div>
										<p className="mb-3 text-sm font-medium leading-none text-left text-gray-800">Team Name</p>
										<div className="flex items-center justify-start ">
											<input className="relative w-full h-12 px-4 py-3 text-sm leading-none text-left text-gray-600 border border-gray-300 rounded outline-none" type="text" placeholder="For example “Alpha”" onChange={(e) => setSearchContent(e.target.value)} />
										</div>
									</div>
									<div>
										<p className="mb-3 text-sm font-medium leading-none text-left text-gray-800">Team Type</p>
										<div className="relative ">
											<div className="relative w-full mt-2 border border-gray-300 rounded outline-none dropdown-one">
												<button onClick={showDropDownMenu} className="relative flex items-center justify-between w-full h-12 px-5 py-3 dropbtn-one">
													<span className="pr-4 text-sm font-medium text-gray-600" id="drop-down-content-setter">
														Beginner
													</span>
													<svg id="rotate" className="absolute z-10 cursor-pointer right-5" width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.5 0.75L5 5.25L9.5 0.75" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</button>
												<div className="absolute right-0 hidden w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12" id="drop-down-div">
													<a href="javascript:void(0)" className="hover"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptext}>
														Beginner
													</p></a>
													<a href="javascript:void(0)"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptext}>
														Intermediate
													</p></a>
													<a href="javascript:void(0)"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptext}>
														Expert
													</p></a>
												</div>
											</div>
											{/* end */}
										</div>
									</div>
									<div className="w-full mt-8 lg:mt-0">
										<p className="mb-3 text-sm font-medium leading-none text-left text-gray-800">Team Size</p>
										<div className="flex items-center justify-between">
											<div className="sets flex flex-wrap items-center justify-between w-full h-full px-3 py-4 border border-gray-300 rounded lg:h-12 md:h-12 md:flex-nowrap lg:flex-nowrap lg:gap-x-3  ">
												<div className="flex p-2" id="rad">
													<input type="radio" name="same" className="mt-3 accent-indigo-700" />
													<label className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:text-indigo-700 hover:rounded">1-5</label>
												</div>
												<div className="flex p-2 lg:p-0 md:p-0">
													<input type="radio" name="same" className="mt-3 accent-indigo-700" />
													<label className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:text-indigo-700 hover:rounded">5-10</label>
												</div>
												<div className="flex p-2 lg:p-0 md:p-0 ">
													<input type="radio" name="same" className="mt-3 accent-indigo-700" />
													<label className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:text-indigo-700 hover:rounded">10-15</label>
												</div>
												<div className="flex p-2 lg:p-0 md:p-0 ">
													<input type="radio" name="same" className="mt-3 accent-indigo-700" />
													<label className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:text-indigo-700 hover:rounded">15-20</label>
												</div>
												<div className="flex p-2 lg:p-0 md:p-0 ">
													<input type="radio" name="same" className="mt-3 accent-indigo-700" />
													<label className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:text-indigo-700 hover:rounded">20+</label>
												</div>
											</div>
										</div>
									</div>
									<div className>
										<p className="mb-3 text-sm font-medium leading-none text-left text-gray-800">Amount</p>
										<div className="flex items-center h-12 px-4 py-3 mt-2 border rounded border-slate-300">
											<div className="svg-container" onClick={minusme}>
												<svg className="rounded-full cursor-pointer hover:bg-gray-100" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z" stroke="#475569" strokeMiterlimit={10} />
													<path d="M15.75 12H8.25" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
											<div className="pl-4 dollar-container">
												<p className="pr-1 text-sm leading-none text-slate-600">$</p>
											</div>
											<div className="w-full text-sm leading-none text-container text-slate-600">
												1000
											</div>
											<div className="svg-container" onClick={plusme}>
												<svg className="rounded-full cursor-pointer hover:bg-gray-100" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z" stroke="#475569" strokeMiterlimit={10} />
													<path d="M12 8.25V15.75" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" />
													<path d="M15.75 12H8.25" stroke="#475569" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</div>
										</div>
									</div>
									<div className>
										<p className="mb-3 text-sm font-medium leading-none text-left text-gray-800">Category</p>
										<div className="relative ">
											<div className="relative w-full mt-2 border border-gray-300 rounded outline-none dropdown-one ">
												<button onClick={showDropDownMenuOne} className="relative flex items-center justify-between w-full h-12 px-5 py-3 dropbtn-one">
													<span className="pr-4 text-sm font-medium text-gray-600" id="drop-down-content-setter-one">
														Q/A
													</span>
													<svg id="rotate1" className="absolute z-10 cursor-pointer right-5" width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.5 0.75L5 5.25L9.5 0.75" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</button>
												<div className="absolute right-0 z-20 hidden w-full px-1 py-2 overflow-y-auto bg-white border-t border-gray-200 rounded shadow top-12 lg:overflow-y-auto lg:h-[128px] " id="drop-down-div-one">
													<a href="javascript:void(0)" className="hover"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptextone}>
														Q/A
													</p></a>
													<a href="javascript:void(0)"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptextone}>
														Designing
													</p></a>
													<a href="javascript:void(0)"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptextone}>
														Developement
													</p></a>
													<a href="javascript:void(0)"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptextone}>
														Marketing
													</p></a>
													<a href="javascript:void(0)"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptextone}>
														Business Developement
													</p></a>
												</div>
											</div>
										</div>
									</div>
									<div className>
										<p className="mb-3 text-sm font-medium leading-none text-left text-gray-800">Group Type</p>
										<div className="relative ">
											<div className="relative w-full mt-2 border border-gray-300 rounded outline-none dropdown-one">
												<button onClick={showDropDownMenutwo} className="relative flex items-center justify-between w-full h-12 px-5 py-3 dropbtn-one">
													<span className="pr-4 text-sm font-medium text-gray-600" id="drop-down-content-setter-two">
														All
													</span>
													<svg id="rotate1" className="absolute z-10 cursor-pointer right-5" width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M0.5 0.75L5 5.25L9.5 0.75" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</button>
												<div className="absolute right-0 z-20 hidden w-full px-1 py-2 bg-white border-t border-gray-200 rounded shadow top-12" id="drop-down-div-two">
													<a href="javascript:void(0)" className="hover"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptexttwo}>
														All
													</p></a>
													<a href="javascript:void(0)"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptexttwo}>
														Users
													</p></a>
													<a href="javascript:void(0)"><p className="p-3 text-sm leading-none text-gray-600 cursor-pointer hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded" onClick={swaptexttwo}>
														Orders
													</p></a>
												</div>
											</div>
										</div>
									</div>
									{/* Interaction */}
								</div>
								<div className="flex flex-col items-center justify-end w-full gap-4 mt-10 lg:flex-row">
									<button className="bg-white  text-indigo-700 lg:max-w-[164px] font-medium px-6 py-4 w-full border border-indigo-700  rounded-[4px] leading-[14px] hover:bg-gray-50" onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}>Cancel</button>
									<button className="bg-indigo-700  text-white lg:max-w-[164px] font-medium px-6 py-4 w-full  rounded-[4px] leading-[14px] hover:bg-indigo-600" onClick={() => props.onSearchAction(searchContent)} onKeyPress={(e) => e.key === 'Enter' ? props.onSearchAction(searchContent) : ""}>Search</button>
								</div>
							</>
						)}

				</div>

				<style>
					{
						`
      input[type="radio"]:checked + label {

        color: rgb(67 56 202);
      
      }
      @media (max-width: 492px) {
        .sets{
          justify-content: start;
        }
        /* width */
  ::-webkit-scrollbar {
    width: 5px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
    
      `
					}
				</style>
			</div>
		</>
	);
}

export default Search;

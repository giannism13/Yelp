import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../constants/constants";


export const CATEGORIES = [
	"Alcohol",
	"BikeParking",
	"NoiseLevel",
	"RestaurantsAttire",
	"RestaurantsPriceRange",
	"Smoking",
	"WiFi"
]

const FilterContext = createContext('FILTERS');

export const FilterContextProvider = ({ children }) => {
	const initialValues = {
		"Alcohol": {},
		"BikeParking": {},
		"NoiseLevel": {},
		"RestaurantsAttire": {},
		"RestaurantsPriceRange": {},
		"Smoking": {},
		"WiFi": {},
	}
	const [filterValues, setFilterValues] = useState(initialValues)

	const setFilterValue = useCallback((category, filter, value) => {
		setFilterValues((v) => ({ ...v, [category]: { ...v[category], [filter]: value } }))
	}, [setFilterValues]);

	useEffect(() => {
		for (const category of CATEGORIES) {
			fetch(`${API_URL}/get-all-values/${category}`)
				.then(response => response.json())
				.then(
					data => {
						for (const item of data) {
							setFilterValue(category, item, true);
						}
					}
				);
		}

	}, []);

	return <FilterContext.Provider value={{ filterValues, setFilterValue }}>
		{children}
	</FilterContext.Provider>
}

export const useFilterContext = () => useContext(FilterContext)
import React, { useEffect, useState } from 'react'
import { API_URL } from '../constants/constants';

const LocationSelect = (props) => {

	const { state, city, onStateChange, onCityChange } = props

	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	useEffect(() => {
		fetch(`${API_URL}/get_all_states`)
			.then(response => response.json())
			.then(
				data => {
					console.log(data)
					setStates(data);
				}
			);
	}, []);

	useEffect(() => {
		fetch(`${API_URL}/get_all_cities/${state}`)
			.then(response => response.json())
			.then(
				data => {
					setCities(data);
				}
			);
	}, [state])

	return (
		<div>
			<select value={state} onChange={(e) => onStateChange(e.target.value)}>
				<option key={-1} value={null}>
					None
				</option>
				{states.map((state, i) => (
					<option key={i} value={state}>
						{state}
					</option>)
				)}
			</select>

			{cities.length > 0 && <select value={city} onChange={(e) => onCityChange(e.target.value)}>
				<option key={-1} value={null}>
					None
				</option>
				{cities.map((city, i) => (
					<option key={i} value={city}>
						{city}
					</option>))}
			</select>}
		</div>
	)
}

export default LocationSelect

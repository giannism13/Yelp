import { useEffect, useState } from "react";
import { API_URL } from "../constants/constants";

const AttributeValueSelect = (props) => {
	const { attribute, attributeValue, onAttributeValueChange } = props
	const [attributeValues, setAttributeValues] = useState([])

	useEffect(() => {
		fetch(`${API_URL}/get-all-values/${attribute}`)
			.then(response => response.json())
			.then(
				data => {
					setAttributeValues(data);
				}
			);
	}, []);

	useEffect(() => {
		fetch(`${API_URL}/get-all-values/${attribute}`)
			.then(response => response.json())
			.then(
				data => {
					setAttributeValues(data);
				}
			);
	}, [attribute]);

	return (
		<select value={attributeValue} onChange={(e) => onAttributeValueChange(e.target.value)}>
			{attributeValues.map((attributeValue, i) => (
				<option key={i} value={attributeValue}>
					{attributeValue}
				</option>)
			)}
		</select>
	)
}

export default AttributeValueSelect

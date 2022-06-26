const AttributeSelect = (props) => {

	const { attribute, onAttributeChange } = props

	const attributes = [
		"Alcohol",
		"BikeParking",
		"NoiseLevel",
		"RestaurantsAttire",
		"RestaurantsPriceRange",
		"Smoking",
		"WiFi"
	]

	return (
		<select value={attribute} onChange={(e) => onAttributeChange(e.target.value)}>
			{attributes.map((attribute, i) => (
				<option key={i} value={attribute}>
					{attribute}
				</option>)
			)}
		</select>
	)
}

export default AttributeSelect

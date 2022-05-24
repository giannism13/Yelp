import { useState, useEffect } from "react"
import { useSearchParams } from 'react-router-dom';

const Business = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [businessData, setBusinessData] = useState([]);

	const businessId = searchParams.get("id");

	useEffect(() => {
		fetch(`http://localhost:3001/business/${businessId}`)
			.then(response => response.json())
			.then(
				data => {
					setBusinessData(data);
					console.log(data);
				}
			);
	}, []);

	return (
		<>
			<div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8 h-100">
				{businessData.name}
				{/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
				<div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 h-24" />
				{/* Remove class [ h-24 ] when adding a card block */}
				{/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
				<div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 h-24" />
				{/* Remove class [ h-24 ] when adding a card block */}
				{/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
				<div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 h-24" />
			</div>
		</>
	);
}

export default Business;
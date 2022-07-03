import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import ImagesHolder from "../components/ImagesHolder";
import { API_URL } from "../constants/constants";

import star from "../../src/star.png"

const Business = () => {
	const [searchParams] = useSearchParams();
	const [businessData, setBusinessData] = useState([]);

	const businessId = searchParams.get("id");

	const [images, setImages] = useState([]);

	useEffect(() => {
		fetch(`http://localhost:3001/business/${businessId}`)
			.then(response => response.json())
			.then(
				data => {
					setBusinessData(data);
				}
			);

		fetch(`http://localhost:3001/imgFilenames/${businessId}/?q=2`)
			.then(response => response.json())
			.then(
				data => {
					setImages(data);
				}
			);
	}, [businessId]);

	const imageInput = useMemo(() => images.map((image) => ({ original: `${API_URL}/images/${image.photo_id}.jpg` })), [images]);

	return (
		<div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4 ">
			<div className="flex justify-center lg:flex-row flex-col gap-8">
				{/* <!-- Description Div --> */}

				<div className="flex flex-col  w-full sm:w-96 md:w-8/12 lg:w-6/12">
					<h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 mt-4">{businessData.name}</h2>
					<h3 className="lg:text-xl lg:leading-9 leading-7 text-gray-500">{businessData.categories}</h3>
					<div className="flex flex-row justify-between  mt-5">
						<div className="flex flex-row space-x-3">
							<img src={star} alt="" />
							<p className="pt-1 font-bold"> {businessData.stars} </p>
						</div>
						<p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer">{businessData.review_count} reviews</p>
					</div>

					<div className="lg:mt-11 mt-10 w-full">

						<hr className=" bg-gray-200 w-full my-2" />
						<div className=" flex flex-row justify-between items-center mt-2">
							<ul className="font-medium text-base leading-4 text-gray-600">
								<li> <b>Monday:</b>  {businessData.Monday ? businessData.Monday + " " : "Closed"} </li>
								<li> <b>Tuesday:</b>  {businessData.Tuesday ? businessData.Tuesday + " " : "Closed"} </li>
								<li> <b>Wednesday:</b> {businessData.Wednesday ? businessData.Wednesday + " " : "Closed"} </li>
								<li> <b>Thursday:</b>  {businessData.Thursday ? businessData.Thursday + " " : "Closed"} </li>
								<li> <b>Friday:</b>  {businessData.Friday ? businessData.Friday + " " : "Closed"} </li>
								<li> <b>Saturday:</b> {businessData.Saturday ? businessData.Saturday + " " : "Closed"} </li>
								<li> <b>Sunday:</b>  {businessData.Sunday ? businessData.Sunday + " " : "Closed"} </li>
							</ul>
						</div>
						<hr className=" bg-gray-200 w-full mt-4" />
						<p className="font-medium text-base leading-3 text-black mt-8">{businessData.address}, {businessData.postal_code}, {businessData.city}, {businessData.state}</p>
					</div>
					<div className="w-full h-full mt-1 pb-2">
						{
							businessData.latitude && (<MapContainer center={[businessData.latitude, businessData.longitude]} zoom={16} style={{ width: '100%', height: "300px" }}>
								<Marker position={[businessData.latitude, businessData.longitude]}>
									<Popup>
										{businessData.name}
									</Popup>
								</Marker>
								<TileLayer
									attribution=''
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
							</MapContainer>)
						}
					</div>

				</div>
				<div className="w-1/2 h-full items-center">
					<ImagesHolder images={imageInput} />
				</div>
			</div>
			<div className="flex  justify-center items-center w-full">
				<div className="w-full sm:w-96 md:w-8/12 lg:w-full grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-14 sm:gap-x-6 sm:gap-y-6 gap-y-6 sm:mt-14 mt-10">
					<div>
						<p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Alcohol</p>
						<p className="text-normal text-base leading-6 text-gray-600 mt-4">{(businessData.Alcohol) != "" ? businessData.Alcohol : "No info"}</p>
					</div>
					<div>
						<p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Bike Parking</p>
						<p className="text-normal text-base leading-6 text-gray-600 mt-4">{(businessData.BikeParking) != "" ? businessData.BikeParking : "No info"}</p>
					</div>
					<div>
						<p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Noise Level</p>
						<p className="text-normal text-base leading-6 text-gray-600 mt-4">{(businessData.NoiseLevel) != "" ? businessData.NoiseLevel : "No info"}</p>
					</div>
					<div>
						<p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Restaurant's Attire</p>
						<p className="text-normal text-base leading-6 text-gray-600 mt-4">{(businessData.RestaurantsAttire) != "" ? businessData.RestaurantsAttire : "No info"}</p>
					</div>
					<div>
						<p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Restaurant's Price Range</p>
						<p className="text-normal text-base leading-6 text-gray-600 mt-4">{(businessData.RestaurantsPriceRange) != "" ? businessData.RestaurantsPriceRange : "No info"}</p>
					</div>
					<div>
						<p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">Smoking</p>
						<p className="text-normal text-base leading-6 text-gray-600 mt-4">{(businessData.Smoking) != "" ? businessData.Smoking : "No info"}</p>
					</div>
					<div>
						<p className="font-semibold text-xl leading-5 text-gray-800 lg:mt-10 mt-9">WiFi</p>
						<p className="text-normal text-base leading-6 text-gray-600 mt-4">{(businessData.WiFi) != "" ? businessData.WiFi : "No info"}</p>
					</div>
				</div>
			</div>
		</div >
	);
}

export default Business;
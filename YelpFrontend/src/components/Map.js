import React, { useState, useEffect } from "react";
import {
	InfoWindow,
	Marker,
	GoogleMap,
	useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
	width: "100%",
	height: "calc(100vh - 115px)",
};
const centerUSA = {
	lat: 39.5,
	lng: -98.35,
};
Object.freeze(centerUSA);

export default function Map(props) {
	const { data, zoom } = props;
	const [selectedBusiness, setSelectedBusiness] = useState(null);
	const [businesses, setBusinesses] = useState([]);
	const [center, setCenter] = useState(centerUSA);

	useEffect(() => {
		let lat = 0;
		let lng = 0;

		setBusinesses(data);

		businesses.forEach((b) => {
			lat += b.latitude;
			lng += b.longitude;
		});

		lat = !lat || lat === 0 ? centerUSA.lat : (lat /= data.length);
		lng = !lng || lng === 0 ? centerUSA.lng : (lng /= data.length);

		setCenter({ lat, lng });
	}, [data, businesses]);

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "AIzaSyD3emDqMWl0lhG6fJs4xr4MNSokdPuJfsM",
	});

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={zoom}
			onLoad={() => console.log("Map loaded")}
			onUnmount={() => console.log("Map unmounted")}
			key={"map"}
		>
			{businesses.map((business) => (
				<Marker
					key={"map-marker-" + business.business_id}
					position={{
						lat: Number.parseFloat(business.latitude),
						lng: Number.parseFloat(business.longitude),
					}}
					onClick={() => {
						console.log("Marker clicked");
						setSelectedBusiness(business);
					}}
				/>
			))}

			{selectedBusiness && (
				<InfoWindow
					key={"map-infowindow-" + selectedBusiness.business_id}
					position={{
						lat: Number.parseFloat(selectedBusiness.latitude),
						lng: Number.parseFloat(selectedBusiness.longitude),
					}}
					onCloseClick={() => {
						setSelectedBusiness(null);
					}}
				>
					<div>
						<h2> {selectedBusiness.name}</h2>
						<p> {selectedBusiness.stars} &#11088;</p>
						<p>
							{" "}
							{selectedBusiness.review_count}{" "}
							<a href="http://localhost:3001/Reviews" target="">
								{" "}
								Reviews
							</a>{" "}
						</p>

						<p>
							<a
								href={"/business?id=" + selectedBusiness.business_id}
								target=""
							>
								{" "}
								See more Information{" "}
							</a>{" "}
						</p>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	) : (
		<></>
	);
}

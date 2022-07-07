import React, { useState, useEffect } from "react";
import {
  InfoWindow,
  Marker,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function Map() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [center, setCenter] = useState({
    lat: 39.5,
    lng: -98.35,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const { businessName, city, state, max, isOpen } = Object.fromEntries(
      fd.entries()
    );
    fetch(
      `http://localhost:3001/businesses?businessName=${businessName}&city=${city}&state=${state}&max=${max}&isOpen=${isOpen}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBusinesses(data);
        let clat = 0;
        let clng = 0;

        data.forEach((b) => {
          clat += b.latitude;
          clng += b.longitude;
        });

        clat = clat == 0 ? center.lat : (clat /= data.length);
        clng = clng == 0 ? center.lng : (clng /= data.length);

        setCenter({ lat: clat, lng: clng });
        console.log({ data, clat, clng });
      });
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD3emDqMWl0lhG6fJs4xr4MNSokdPuJfsM",
  });

  return isLoaded ? (
    <div className="">
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="state">Name: </label>
          <input
            type="text"
            className=""
            name="businessName"
            id="businessName"
          />
          <label htmlFor="state">State code: </label>
          <input type="text" className="" name="state" id="state" />
          <label htmlFor="state">City: </label>
          <input type="text" className="" name="city" id="city" />
          <label htmlFor="state">Max: </label>
          <input
            type="number"
            className=""
            name="max"
            id="max"
            min="1"
            max="1000"
            defaultValue={1000}
          />
          <label htmlFor="isOpen">Open</label>
          <select name="isOpen" id="isOpen">
            <option value="all" selected>
              All
            </option>
            <option value="1">Open</option>
            <option value="0">Close</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onLoad={() => console.log("Map loaded")}
          onUnmount={() => console.log("Map unmounted")}
        >
          {businesses.map((business) => (
            <Marker
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
                  <a href="http://localhost:3001/Reviews" target="_blank">
                    {" "}
                    Reviews
                  </a>{" "}
                </p>

                <p>
                  <a
                    href={"/business?id=" + selectedBusiness.business_id}
                    target="_blank"
                  >
                    {" "}
                    See more Informations{" "}
                  </a>{" "}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Map);

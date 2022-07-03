import React, { useState, useEffect } from "react";
import { API_URL } from "../constants/constants";

const Filtering = (props) => {
    const { showFilters } = props

    const [check, setCheck] = useState({
        leather: false,
        cotton: false,
        fabric: false,
        crocodile: false,
        wool: false,
        large: false,
        medium: false,
        small: false,
        mini: false,
        luxesignatire: false,
        luxelondon: false,
    });

    const { leather, cotton, fabric, crocodile, wool, large, medium, small, mini, luxesignatire, luxelondon } = check;

    const changeHandler = (e) => {
        setCheck({
            ...check,
            [e.target.name]: e.target.checked,
        });
    };

    const applyFilters = (e) => {
        setCheck({
            ...check,
            leather: false,
            cotton: false,
            fabric: false,
            crocodile: false,
            wool: false,
            large: false,
            medium: false,
            small: false,
            mini: false,
            luxesignatire: false,
            luxelondon: false,
        });
    };

    const [alchoholValues, setAlcoholValues] = useState([]);
    const [smokingValues, setSmokingValues] = useState([]);
    const [wifiValues, setWifiValues] = useState([]);
    const [restaurantspricerangeValues, setRestaurantspricerange] = useState([]);
    const [bikeparkingValues, setBikeparking] = useState([]);
    const [noiselevelValues, setNoiselevel] = useState([]);
    const [restaurantsattireValues, setRestaurantsattireValues] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/get-all-values/Alcohol`)
            .then(response => response.json())
            .then(
                data => {
                    setAlcoholValues(data);
                }
            );
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/get-all-values/Smoking`)
            .then(response => response.json())
            .then(
                data => {
                    setSmokingValues(data);
                }
            );
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/get-all-values/WiFi`)
            .then(response => response.json())
            .then(
                data => {
                    setWifiValues(data);
                }
            );
    }, []);

    useEffect(() => {

        fetch(`${API_URL}/get-all-values/RestaurantsPriceRange`)
            .then(response => response.json())
            .then(
                data => {
                    setRestaurantspricerange(data);
                }
            );
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/get-all-values/BikeParking`)
            .then(response => response.json())
            .then(
                data => {
                    setBikeparking(data);
                }
            );
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/get-all-values/NoiseLevel`)
            .then(response => response.json())
            .then(
                data => {
                    setNoiselevel(data);
                }
            );
    }, []);

    useEffect(() => {
        fetch(`${API_URL}/get-all-values/RestaurantsAttire`)
            .then(response => response.json())
            .then(
                data => {
                    setRestaurantsattireValues(data);
                }
            );
    }, []);

    const filters = ["Alcohol",
        "BikeParking",
        "NoiseLevel",
        "RestaurantsAttire",
        "RestaurantsPriceRange",
        "Smoking",
        "WiFi"
    ]

    return ( <
        div className = "2xl:container 2xl:mx-auto" >

        <
        div id = "filterSection"
        className = { "relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full " + (showFilters ? "block" : "hidden") } >
        <
        div >
        <
        div className = " flex space-x-2" > {
            /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            							<path d="M19 3H15C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5V17C13 18.0609 13.4214 19.0783 14.1716 19.8284C14.9217 20.5786 15.9391 21 17 21C18.0609 21 19.0783 20.5786 19.8284 19.8284C20.5786 19.0783 21 18.0609 21 17V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M12.9994 7.35022L10.9994 5.35022C10.6243 4.97528 10.1157 4.76465 9.58539 4.76465C9.05506 4.76465 8.54644 4.97528 8.17139 5.35022L5.34339 8.17822C4.96844 8.55328 4.75781 9.06189 4.75781 9.59222C4.75781 10.1225 4.96844 10.6312 5.34339 11.0062L14.3434 20.0062" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M7.3 13H5C4.46957 13 3.96086 13.2107 3.58579 13.5858C3.21071 13.9609 3 14.4696 3 15V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H17" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M17 17V17.01" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            						</svg> */
        } <
        p className = " lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > Alcohol < /p> <
        /div> <
        div className = " md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" >
        <
        div className = " flex space-x-2 md:justify-center md:items-center items-center justify-start" > {
            alchoholValues.map((value, idx) =>
                ( <
                    div className = " flex justify-center items-center" >
                    <
                    input className = "w-4 h-4 mr-2"
                    type = "checkbox"
                    id = "Wool"
                    name = "wool"
                    value = "Wool"
                    checked = { wool }
                    onChange = { changeHandler }
                    /> <
                    div className = " inline-block" >
                    <
                    div className = " flex space-x-6 justify-center items-center" >
                    <
                    label className = " mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor = "Wool" > { value } <
                    /label> <
                    /div> <
                    /div> <
                    /div>
                )
            )
        } <
        /div>

        <
        /div> <
        /div>

        <
        hr className = " bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" / >

        { /* Material Section */ } <
        div >
        <
        div className = " flex space-x-2" > {
            /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            							<path d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            						</svg>  */
        } <
        p className = " lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > Smoking < /p> <
        /div> <
        div className = " md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
            smokingValues.map((value, idx) =>
                ( <
                    div className = " flex justify-center items-center" >
                    <
                    input className = "w-4 h-4 mr-2"
                    type = "checkbox"
                    id = "Wool"
                    name = "wool"
                    value = "Wool"
                    checked = { wool }
                    onChange = { changeHandler }
                    /> <
                    div className = " inline-block" >
                    <
                    div className = " flex space-x-6 justify-center items-center" >
                    <
                    label className = " mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor = "Wool" > { value } <
                    /label> <
                    /div> <
                    /div> <
                    /div>
                )
            )
        } <
        /div> <
        /div>

        <
        hr className = " bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" / >

        { /* Size Section */ } <
        div >
        <
        div className = " flex space-x-2" > {
            /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            							<path d="M3 5H14" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M12 7L14 5L12 3" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M5 3L3 5L5 7" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M19 10V21" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M17 19L19 21L21 19" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M21 12L19 10L17 12" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M12 10H5C3.89543 10 3 10.8954 3 12V19C3 20.1046 3.89543 21 5 21H12C13.1046 21 14 20.1046 14 19V12C14 10.8954 13.1046 10 12 10Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            						</svg> */
        } <
        p className = "  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > WiFi < /p> <
        /div> <
        div className = " md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
            wifiValues.map((value, idx) =>
                ( <
                    div className = " flex justify-center items-center" >
                    <
                    input className = "w-4 h-4 mr-2"
                    type = "checkbox"
                    id = "Wool"
                    name = "wool"
                    value = "Wool"
                    checked = { wool }
                    onChange = { changeHandler }
                    /> <
                    div className = " inline-block" >
                    <
                    div className = " flex space-x-6 justify-center items-center" >
                    <
                    label className = " mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor = "Wool" > { value } <
                    /label> <
                    /div> <
                    /div> <
                    /div>
                )
            )
        } <
        /div> <
        /div>

        <
        hr className = " bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" / >

        { /* Collection Section */ }

        <
        div >
        <
        div className = " flex space-x-2" > {
            /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            							<g opacity="0.8">
            								<path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            								<path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            								<path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            								<path d="M14 7H20" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            								<path d="M17 4V10" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							</g>
            						</svg> */
        } <
        p className = " lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > Restaurant 's Price Range</p> <
        /div> <
        div className = " flex mt-8 space-x-8" > {
            restaurantsattireValues.map((value, idx) =>
                ( <
                    div className = " flex justify-center items-center" >
                    <
                    input className = "w-4 h-4 mr-2"
                    type = "checkbox"
                    id = "Wool"
                    name = "wool"
                    value = "Wool"
                    checked = { wool }
                    onChange = { changeHandler }
                    /> <
                    div className = " inline-block" >
                    <
                    div className = " flex space-x-6 justify-center items-center" >
                    <
                    label className = " mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor = "Wool" > { value } <
                    /label> <
                    /div> <
                    /div> <
                    /div>
                )
            )
        } <
        /div> <
        /div>

        <
        div >
        <
        div className = " flex space-x-2" > {
            /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            							<path d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            						</svg>  */
        } <
        p className = " lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > BikeParking < /p> <
        /div> <
        div className = " md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
            bikeparkingValues.map((value, idx) =>
                ( <
                    div className = " flex justify-center items-center" >
                    <
                    input className = "w-4 h-4 mr-2"
                    type = "checkbox"
                    id = "Wool"
                    name = "wool"
                    value = "Wool"
                    checked = { wool }
                    onChange = { changeHandler }
                    /> <
                    div className = " inline-block" >
                    <
                    div className = " flex space-x-6 justify-center items-center" >
                    <
                    label className = " mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor = "Wool" > { value } <
                    /label> <
                    /div> <
                    /div> <
                    /div>
                )
            )
        } <
        /div> <
        /div>

        <
        div >
        <
        div className = " flex space-x-2" > {
            /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            							<path d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            						</svg>  */
        } <
        p className = " lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > RestaurantsAttire < /p> <
        /div> <
        div className = " md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
            restaurantsattireValues.map((value, idx) =>
                ( <
                    div className = " flex justify-center items-center" >
                    <
                    input className = "w-4 h-4 mr-2"
                    type = "checkbox"
                    id = "Wool"
                    name = "wool"
                    value = "Wool"
                    checked = { wool }
                    onChange = { changeHandler }
                    /> <
                    div className = " inline-block" >
                    <
                    div className = " flex space-x-6 justify-center items-center" >
                    <
                    label className = " mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor = "Wool" > { value } <
                    /label> <
                    /div> <
                    /div> <
                    /div>
                )
            )
        } <
        /div> <
        /div>

        <
        div >
        <
        div className = " flex space-x-2" > {
            /* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            							<path d="M9.5 16C13.0899 16 16 13.0899 16 9.5C16 5.91015 13.0899 3 9.5 3C5.91015 3 3 5.91015 3 9.5C3 13.0899 5.91015 16 9.5 16Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            							<path d="M19 10H12C10.8954 10 10 10.8954 10 12V19C10 20.1046 10.8954 21 12 21H19C20.1046 21 21 20.1046 21 19V12C21 10.8954 20.1046 10 19 10Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            						</svg>  */
        } <
        p className = " lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > NoiseLevel < /p> <
        /div> <
        div className = " md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
            noiselevelValues.map((value, idx) =>
                ( <
                    div className = " flex justify-center items-center" >
                    <
                    input className = "w-4 h-4 mr-2"
                    type = "checkbox"
                    id = "Wool"
                    name = "wool"
                    value = "Wool"
                    checked = { wool }
                    onChange = { changeHandler }
                    /> <
                    div className = " inline-block" >
                    <
                    div className = " flex space-x-6 justify-center items-center" >
                    <
                    label className = " mr-2 text-sm leading-3 font-normal text-gray-600"
                    htmlFor = "Wool" > { value } <
                    /label> <
                    /div> <
                    /div> <
                    /div>
                )
            )
        } <
        /div> <
        /div>

        <
        div className = "px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6" >
        <
        button onClick = { applyFilters }
        className = "w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" >
        Apply Filter <
        /button> <
        /div> <
        /div> <
        /div>
    );
};

export default Filtering;
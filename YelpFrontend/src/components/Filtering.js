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

    return (
        <div className="2xl:container 2xl:mx-auto" >
            <div id="filterSection" className={"relative md:py-10 lg:px-20 md:px-6 py-9 px-4 bg-gray-50 w-full " + (showFilters ? "block" : "hidden")} >
                <div >
                    <div className=" flex space-x-2" >
                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > Alcohol </p>
                    </div>
                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" >
                        <div className=" flex space-x-2 md:justify-center md:items-center items-center justify-start" > {
                            alchoholValues.map((value, idx) =>
                            (
                                <div className=" flex justify-center items-center" >
                                    <input className="w-4 h-4 mr-2" type="checkbox" id="Wool" name="wool" value="Wool" checked={wool} onChange={changeHandler} />
                                    <div className=" inline-block">
                                        <div className=" flex space-x-6 justify-center items-center" >
                                            <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Wool" > {value} </label>
                                        </div>
                                    </div>
                                </div>
                            )
                            )
                        }
                        </div>

                    </div>
                </div>

                <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

                { /* Material Section */}
                <div>
                    <div className=" flex space-x-2" >
                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > Smoking </p>
                    </div>
                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
                        smokingValues.map((value, idx) =>
                        (
                            <div className=" flex justify-center items-center" >
                                <input className="w-4 h-4 mr-2" type="checkbox" id="Wool" name="wool" value="Wool" checked={wool} onChange={changeHandler} />
                                <div className=" inline-block" >
                                    <div className=" flex space-x-6 justify-center items-center" >
                                        <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Wool" > {value}</label>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    } </div>
                </div>

                <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

                { /* Size Section */}
                <div>
                    <div className=" flex space-x-2" >
                        <p className="  lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > WiFi </p>
                    </div>
                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
                        wifiValues.map((value, idx) =>
                        (
                            <div className=" flex justify-center items-center" >
                                <input className="w-4 h-4 mr-2" type="checkbox" id="Wool" name="wool" value="Wool" checked={wool} onChange={changeHandler} />
                                <div className=" inline-block" >
                                    <div className=" flex space-x-6 justify-center items-center" >
                                        <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Wool" > {value} </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className=" bg-gray-200 lg:w-6/12 w-full md:my-10 my-8" />

                { /* Collection Section */}

                <div>
                    <div className=" flex space-x-2" >
                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > Restaurant's Price Range</p>
                    </div>
                    <div className=" flex mt-8 space-x-8" > {
                        restaurantspricerangeValues.map((value, idx) =>
                        (
                            <div className=" flex justify-center items-center" >
                                <input className="w-4 h-4 mr-2" type="checkbox" id="Wool" name="wool" value="Wool" checked={wool} onChange={changeHandler} />
                                <div className=" inline-block" >
                                    <div className=" flex space-x-6 justify-center items-center" >
                                        <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Wool" > {value} </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div >
                    <div className=" flex space-x-2" >
                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > Bike Parking </p>
                    </div>
                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
                        bikeparkingValues.map((value, idx) =>
                        (
                            <div className=" flex justify-center items-center" >
                                <input className="w-4 h-4 mr-2" type="checkbox" id="Wool" name="wool" value="Wool" checked={wool} onChange={changeHandler} />
                                <div className=" inline-block" >
                                    <div className=" flex space-x-6 justify-center items-center" >
                                        <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Wool" > {value} </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div >
                    <div className=" flex space-x-2" >
                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > Restaurant's Attire </p>
                    </div>
                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
                        restaurantsattireValues.map((value, idx) =>
                        (
                            <div className=" flex justify-center items-center" >
                                <input className="w-4 h-4 mr-2" type="checkbox" id="Wool" name="wool" value="Wool" checked={wool} onChange={changeHandler} />
                                <div className=" inline-block" >
                                    <div className=" flex space-x-6 justify-center items-center" >
                                        <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Wool" > {value} </label>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    } </div> </div>

                <div>
                    <div className=" flex space-x-2" >
                        <p className=" lg:text-2xl text-xl lg:leading-6 leading-5 font-medium text-gray-800 " > NoiseLevel </p>
                    </div>
                    <div className=" md:flex md:space-x-6 mt-8 grid grid-cols-3 gap-y-8 flex-wrap" > {
                        noiselevelValues.map((value, idx) =>
                        (
                            <div className=" flex justify-center items-center" >
                                <input className="w-4 h-4 mr-2" type="checkbox" id="Wool" name="wool" value="Wool" checked={wool} onChange={changeHandler} /> <div className=" inline-block" >
                                    <div className=" flex space-x-6 justify-center items-center" >
                                        <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Wool" > {value} </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="px-0 mt-10 w-full md:w-auto md:mt-0 md:absolute md:right-0 md:bottom-0 md:py-10 lg:px-20 md:px-6" >
                    <button onClick={applyFilters} className="w-full hover:bg-gray-700 focus:ring focus:ring-offset-2 focus:ring-gray-800 text-base leading-4 font-medium py-4 px-10 text-white bg-gray-800" >Apply Filter </button>
                </div>
            </div>
        </div>
    );
};

export default Filtering;
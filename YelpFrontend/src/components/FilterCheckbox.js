import React, { useState, useEffect } from "react";

const FilterCheckbox = (props) => {
    const { value } = props;

    return (<div className=" flex justify-center items-center" >
        <input className="w-4 h-4 mr-2" type="checkbox" />
        <div className=" inline-block">
            <div className=" flex space-x-6 justify-center items-center" >
                <label className=" mr-2 text-sm leading-3 font-normal text-gray-600" htmlFor="Wool" > {value} </label>
            </div>
        </div>
    </div>);
};

export default FilterCheckbox;
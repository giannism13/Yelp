import React from "react";

const FilterCheckbox = (props) => {
    const { value, name } = props;

    return (
        <div className="w-1/2">
            <input className="w-4 h-4 mr-2" type="checkbox" name={name} value={value} />
            <div className="inline-block">
                <div className="flex space-x-6 justify-center items-center">
                    <label className="mr-2 text-sm leading-3 font-normal text-gray-600">{value}</label>
                </div>
            </div>
        </div>
    );
};

export default FilterCheckbox;
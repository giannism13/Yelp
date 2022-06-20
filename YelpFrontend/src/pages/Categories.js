import { useState, useEffect } from "react"

const Categories = () => {
    const [businessCategories, setBusinessCategories] = useState([]);

    const businessId = searchParams.get("id");

    useEffect(() => {
        fetch(`http://localhost:3001/categories}`)
            .then(response => response.json())
            .then(
                data => {
                    setBusinessCategories(data);
                    console.log(data);
                }
            );
    }, [businessId]);


    function setValue(event) {
        //TODO: OnChange trigger calling backend for informations
        //Attribute value is in event.target.value

    }


    return ( <
        Select name = "categories"
        options = { businessCategories }
        value = { this.state.value }
        onChange = { setValue }
        getOptionLabel = {
            (category) => category.Name
        }
        />

    );
}

export default Categories;
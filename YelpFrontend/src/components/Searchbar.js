import { useState } from "react"

function Searchbox(props) {
    const [searchContent, setSearchContent] = useState("");

    return (
        <div className="flex justify-center">
            <div>
                <input className="border-4 border-sky-500" type="text" onChange={(e) => setSearchContent(e.target.value)}></input>
                <button onClick={() => props.onSearchAction(searchContent)}>Vres me daddy</button>
            </div>
        </div>
    )
}

export default Searchbox;
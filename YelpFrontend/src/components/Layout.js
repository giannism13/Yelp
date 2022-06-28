//import { useState } from "react"
//import Search from "../components/Search.js";

function Layout({ children }) {
	//const [data, setData] = useState(null);

	return (
		<div className="relative bg-indigo-100 min-h-screen justify-center">
			{children}
		</div>
	);
}

export default Layout;

//import logo from './logo.svg';
//import './App.css';
import { useState } from "react"

function Layout({ children }) {
	const [data, setData] = useState(null);

	return (
		<div>
			{children}
		</div>
	);
}

export default Layout;
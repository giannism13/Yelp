//import logo from './logo.svg';
//import './App.css';
import { useState } from "react"

function Layout({ children }) {
    const [data, setData] = useState(null);

    return (
        <div className="text-3xl font-bold underline">
            {children}
        </div>
    );
}

export default Layout;

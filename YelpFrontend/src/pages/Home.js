import { Link } from "react-router-dom";
import BannerImage from "../assets/pizza.jpeg";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

function Home() {

  return (
    <>
    <Navbar/>
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      
      <div className="headerContainer">
        <h1> Welcome <span/> </h1>
        <p>.</p>
        <p class="text-white">to <span/></p>
        <p class="text-white">our App <span/></p>
        <p class="text-white"> Analyze Yelp's dataset! </p>
        <Link to="index">
          <button> Search it </button>
        </Link>
      </div>
    </div>
    </>
  );
}

export default Home;

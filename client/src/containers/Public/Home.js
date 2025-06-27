import React from "react"; 
import Header from "./Header"; 
import "./Home.css"
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <div className="Home ">
            <div className="Home-image"></div>
            <div className="w-full Home-content"><Header/></div>
            <Outlet />
        </div>
    )
}

export default Home
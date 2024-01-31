import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidenav">
            <a href="#">Browse</a>
            <a href="#">Radio map</a>
            <a href="#">Favorites</a>
        </div>
    );
}

export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidenav">
            <Link to="/">Browse</Link>
            <Link to="/map">Radio map</Link>
            <Link to="/favorites">Favorites</Link>
        </div>
    );
}

export default Sidebar;

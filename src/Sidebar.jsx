import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidenav">
            <Link to="">Browse</Link>
            <Link to="">Radio map</Link>
            <Link to="">Favorites</Link>
        </div>
    );
}

export default Sidebar;

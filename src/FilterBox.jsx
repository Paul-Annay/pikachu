import React from "react";
import Filter from "./Filter";

function FilterBox() {
    return (
        <div className="filter-box">
            <Filter holder="Country" />
            <Filter holder="Language" />
            <Filter holder="Name" />
        </div>
    );
}

export default FilterBox;

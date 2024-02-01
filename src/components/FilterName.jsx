import { useRef } from "react";
import { useStation } from "../contexts/StationContext";
import { useNavigate } from "react-router-dom";

function FilterName() {
    const navigate = useNavigate();
    const { searchQueryName, setSearchQueryName } = useStation();

    const inputRef = useRef();

    function handleSearchQuery(e) {
        e.preventDefault();
        if (searchQueryName.length > 0) setSearchQueryName(e.target.value);

        navigate("/search");
    }

    return (
        <form className="filter-item" onSubmit={handleSearchQuery}>
            <input
                className="filter-input"
                placeholder="Filter by name"
                value={searchQueryName}
                ref={inputRef}
                onChange={(e) => setSearchQueryName(e.target.value)}
            />
        </form>
    );
}

export default FilterName;

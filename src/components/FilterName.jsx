import { useRef, useState } from "react";
import { useStation } from "../contexts/StationContext";
import { useNavigate } from "react-router-dom";

function FilterName() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");

    const { searchQueryName, setSearchQueryName } = useStation();

    const inputRef = useRef();

    function handleSearchQuery(e) {
        e.preventDefault();
        if (inputValue) {
            setSearchQueryName(inputValue);
        }

        navigate(`/search?name=${searchQueryName}`);
    }

    return (
        <form className="filter-item" onSubmit={handleSearchQuery}>
            <input
                className="filter-input"
                placeholder="Filter by name"
                value={inputValue}
                ref={inputRef}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </form>
    );
}

export default FilterName;

import { useEffect, useRef, useState } from "react";
import { useStation } from "./StationContext";
import { useNavigate } from "react-router-dom";

function FilterCountry() {
    const navigate = useNavigate();
    const url = "http://de1.api.radio-browser.info/json/countries";
    const [suggestions, setSuggestion] = useState([]);

    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { searchQueryCountry, setSearchQueryCountry } = useStation();

    const inputRef = useRef();

    function handleSearchQuery(e) {
        e.preventDefault();
        if (searchQueryCountry.length > 0)
            setSearchQueryCountry(e.target.value);

        navigate("/search");
    }

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log("country", data);

                setSuggestion(data);
            });
    }, []);

    return (
        <form className="filter-item" onSubmit={handleSearchQuery}>
            <input
                className="filter-input"
                placeholder="Filter by countries"
                value={searchQueryCountry}
                ref={inputRef}
                onChange={(e) => setSearchQueryCountry(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    if (!isHovered) {
                        setIsFocused(false);
                    }
                }}
            />
            {isFocused && (
                <div
                    className="suggestion"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {suggestions.map((suggestion, i) => {
                        console.log(suggestion);
                        const isMatch =
                            suggestion.name
                                .toLowerCase()
                                .indexOf(searchQueryCountry.toLowerCase()) > -1;
                        return (
                            <div key={i}>
                                {isMatch && (
                                    <div
                                        onClick={() => {
                                            setSearchQueryCountry(
                                                suggestion.name
                                            );
                                            inputRef.current.focus();
                                        }}
                                    >
                                        {suggestion.name}{" "}
                                        {suggestion.stationcount}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </form>
    );
}

export default FilterCountry;

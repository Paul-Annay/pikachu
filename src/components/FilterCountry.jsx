import { useEffect, useRef, useState } from "react";
import { useStation } from "../contexts/StationContext";
import { useNavigate } from "react-router-dom";

function FilterCountry() {
    const navigate = useNavigate();
    const url = "http://de1.api.radio-browser.info/json/countries";
    const [suggestions, setSuggestion] = useState([]);

    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { searchQueryCountry, setSearchQueryCountry } = useStation();
    const [inputValue, setInputValue] = useState("");

    const inputRef = useRef();

    function handleSearchQuery(e) {
        e.preventDefault();
        if (inputValue) {
            console.log(searchQueryCountry);
            console.log(inputValue);
            setSearchQueryCountry(inputValue);
        }
        setInputValue("");

        navigate("/search:orderId");
    }

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSuggestion(data);
            });
    }, []);

    return (
        <form className="filter-item" onSubmit={handleSearchQuery}>
            <input
                className="filter-input"
                placeholder="Filter by countries"
                value={inputValue}
                ref={inputRef}
                onChange={(e) => setInputValue(e.target.value)}
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
                        const isMatch =
                            suggestion.name
                                .toLowerCase()
                                .indexOf(inputValue.toLowerCase()) > -1;
                        return (
                            <div key={i}>
                                {isMatch && (
                                    <div
                                        onClick={() => {
                                            setInputValue(suggestion.name);
                                            setSearchQueryCountry(
                                                suggestion.iso_3166_1
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

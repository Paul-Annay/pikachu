import { useEffect, useRef, useState } from "react";
import { useStation } from "../contexts/StationContext";
import { useNavigate } from "react-router-dom";

function FilterLanguage() {
    const navigate = useNavigate();
    const url =
        "http://de1.api.radio-browser.info/json/languages?hidebroken=true&limit=100&reverse=true&order=stationcount";
    const [suggestions, setSuggestion] = useState([]);

    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { searchQueryLanguage, setSearchQueryLanguage } = useStation();
    const [inputValue, setInputValue] = useState("");

    const inputRef = useRef();

    function handleSearchQuery(e) {
        e.preventDefault();
        if (inputValue) setSearchQueryLanguage(inputValue);

        navigate(`/search?language=${searchQueryLanguage}`);
    }

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setSuggestion(data);
            });
    }, []);

    return (
        <form className="filter-item" onSubmit={handleSearchQuery}>
            <input
                className="filter-input"
                placeholder="Filter by language"
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

export default FilterLanguage;

import React, { useEffect, useRef, useState } from "react";

function Filter({ holder }) {
    const url = "http://de1.api.radio-browser.info/json/countries";
    const [suggestions, setSuggestion] = useState([]);

    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const inputRef = useRef();

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setSuggestion(data);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        setInputValue(inputValue);
    }

    return (
        <form className="filter-item" onSubmit={handleSubmit}>
            <input
                className="filter-input"
                placeholder={`Find by ${holder}`}
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
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {suggestions.map((suggestion) => {
                        const isMatch =
                            suggestion.name
                                .toLowerCase()
                                .indexOf(inputValue.toLowerCase()) > -1;
                        return (
                            <div key={suggestion.iso_3166_1}>
                                {isMatch && (
                                    <div
                                        key={suggestion.iso_3166_1}
                                        onClick={() => {
                                            setInputValue(suggestion.name);
                                            inputRef.current.focus();
                                        }}
                                    >
                                        {suggestion.name}
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

export default Filter;

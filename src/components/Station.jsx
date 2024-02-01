/* eslint-disable react/prop-types */
import radio from "../radio.png";
import { useStation } from "../contexts/StationContext";

function Station({ station }) {
    const { currentStation, selectStation, addToFavorites } = useStation();
    const { name, country, favicon, tags, votes } = station;
    const tagList = tags.split(",");
    return (
        <div className="radio">
            <h2 className="radio-name">{name}</h2>
            <h3 className="radio-country">{country}</h3>
            <img
                className="radio-image"
                src={favicon ? favicon : radio}
                alt={name}
            />
            <div className="radio-tag-list">
                {tagList.map((tag, index) => (
                    <span className="radio-tag" key={index}>
                        {tag}
                    </span>
                ))}
            </div>
            <span className="radio-votes">{votes}</span>
            <button
                className="radio-play-btn"
                onClick={() => {
                    currentStation?.changeuuid === station.changeuuid
                        ? selectStation("")
                        : selectStation(station.changeuuid);
                }}
            >
                {currentStation?.changeuuid !== station.changeuuid
                    ? "▶️"
                    : "⏸️"}
            </button>
            <button onClick={() => addToFavorites(station)}>➕</button>
        </div>
    );
}

export default Station;

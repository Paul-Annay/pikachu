import radio from "./radio.png";
import { useStation } from "./StationContext";

function Station({ station }) {
    const { selectStation } = useStation();
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
                onClick={() => selectStation(station.changeuuid)}
            >
                Play
            </button>
        </div>
    );
}

export default Station;

/* eslint-disable react/prop-types */
import radio from "../radio.png";
import { useStation } from "../contexts/StationContext";
import classes from "./Station.module.css";

function Station({ station }) {
    const { currentStation, selectStation, addToFavorites } = useStation();
    const { name, country, favicon, tags, votes } = station;
    const tagList = tags.split(",");
    return (
        <div className={classes.radio}>
            <h2 className={classes.radioName}>{name}</h2>
            <h3 className={classes.radioCountry}>{country}</h3>
            <img
                className={classes.radioImage}
                src={favicon ? favicon : radio}
                alt={name}
            />
            <div className={classes.radioTagList}>
                {tagList.map((tag, index) => (
                    <span className={classes.radioTag} key={index}>
                        {tag}
                    </span>
                ))}
            </div>
            <span className={classes.radioVotes}>Votes: {votes}</span>
            <button
                className={classes.radioPlayBtn}
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

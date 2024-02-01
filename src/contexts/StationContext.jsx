import { createContext, useContext, useState } from "react";
import { useStations } from "../hooks/useStations";
import { useLocalStorageState } from "../hooks/useLocalStorage";

const StationContext = createContext();

// eslint-disable-next-line react/prop-types
function StationProvider({ children }) {
    const { stations, isLoading, error } = useStations("topvote/100");
    const [favoriteStations, setFavoriteStations] = useLocalStorageState(
        [],
        "favoriteStations"
    );
    const [selectedStationId, setSelectedStationId] = useState(
        "4fcdf908-9025-4308-a82e-c061b42e6e28"
    );
    const [searchQueryCountry, setSearchQueryCountry] = useState("");
    const [searchQueryLanguage, setSearchQueryLanguage] = useState("");
    const [searchQueryName, setSearchQueryName] = useState("");

    const currentStation = stations.filter(
        (station) => station.changeuuid === selectedStationId
    )[0];

    const { stations: stationsByCountry } = useStations(
        `bycountrycodeexact/${searchQueryCountry}`,
        handleSearchQueryCountry
    );

    const { stations: stationsByLanguage } = useStations(
        `bylanguage/${searchQueryLanguage}`,
        handleSearchQueryLanguage
    );

    const { stations: stationsByName } = useStations(
        `search?name=${searchQueryName}`,
        handleSearchQueryName
    );

    function handleSearchQueryCountry() {
        setSearchQueryCountry("");
    }

    function handleSearchQueryLanguage() {
        setSearchQueryLanguage("");
    }

    function handleSearchQueryName() {
        setSearchQueryName("");
    }
    // const searchedStations =
    //     searchQuery.length > 0
    //         ? stations.filter((station) =>
    //               `${station.country}`
    //                   .toLowerCase()
    //                   .includes(searchQuery.toLowerCase())
    //           )
    //         : stations;

    function handleSelect(id) {
        setSelectedStationId(id);
    }

    function handleSelectNext() {
        let currentIndex = -1;
        stations.forEach((station, index) => {
            if (station.changeuuid === currentStation.changeuuid) {
                currentIndex = index;
            }
        });
        setSelectedStationId(stations[currentIndex + 1].changeuuid);
    }

    function handleSelectPrevious() {
        let currentIndex = -1;
        stations.forEach((station, index) => {
            if (station.changeuuid === currentStation.changeuuid) {
                currentIndex = index;
            }
        });
        setSelectedStationId(stations[currentIndex - 1].changeuuid);
    }

    function addToFavorites(station) {
        if (
            favoriteStations?.some((st) => st.changeuuid === station.changeuuid)
        ) {
            return;
        }
        setFavoriteStations((stations) => [...stations, station]);
    }
    function removeFromFavorites(station) {
        const newFav = favoriteStations.filter(
            (st) => st.changeuuid !== station.changeuuid
        );
        setFavoriteStations(newFav);
    }

    return (
        <StationContext.Provider
            value={{
                stations,
                selectStation: handleSelect,
                selectNext: handleSelectNext,
                selectPrevious: handleSelectPrevious,
                currentStation,
                isLoading,
                error,
                favoriteStations,
                searchQueryCountry,
                searchQueryLanguage,
                searchQueryName,
                setSearchQueryCountry,
                setSearchQueryLanguage,
                setSearchQueryName,
                addToFavorites,
                removeFromFavorites,
                stationsByCountry,
                stationsByLanguage,
                stationsByName,
            }}
        >
            {children}
        </StationContext.Provider>
    );
}

function useStation() {
    const context = useContext(StationContext);
    if (context === undefined) {
        throw new Error("Context provided External to Provider");
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { StationProvider, useStation };

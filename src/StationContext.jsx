import { createContext, useContext, useEffect, useState } from "react";
import { useStations } from "./useStations";
import { useLocalStorageState } from "./useLocalStorage";

const StationContext = createContext();

function StationProvider({ children }) {
    const { stations, isLoading, error } = useStations("stations/topvote/15");
    const [favoriteStations, setFavoriteStations] = useLocalStorageState(
        [],
        "favoriteStations"
    );
    const [selectedStationId, setSelectedStationId] = useState(
        "4fcdf908-9025-4308-a82e-c061b42e6e28"
    );
    const [searchQuery, setSearchQuery] = useState("");

    const currentStation = stations.filter(
        (station) => station.changeuuid === selectedStationId
    )[0];

    const searchedStations =
        searchQuery.length > 0
            ? stations.filter((station) =>
                  `${station.country}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
              )
            : stations;

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

    function handleSubmit(e) {
        e.preventDefault();
        setSearchQuery(searchQuery);
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
                stations: searchedStations,
                selectStation: handleSelect,
                selectNext: handleSelectNext,
                selectPrevious: handleSelectPrevious,
                currentStation,
                isLoading,
                error,
                favoriteStations,
                addToFavorites,
                removeFromFavorites,
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

export { StationProvider, useStation };

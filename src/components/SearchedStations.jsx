import { useStation } from "../contexts/StationContext";

function SearchedStations() {
    const { stationsByCountry } = useStation();
    console.log(stationsByCountry);
    return (
        <div>
            {stationsByCountry.map((st) => (
                <div key={st.changeuuid}>
                    {st.name} {st.country}
                </div>
            ))}
        </div>
    );
}

export default SearchedStations;

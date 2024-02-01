import { useSearchParams } from "react-router-dom";
import { useStations } from "../hooks/useStations";

function SearchedStations() {
    const [params] = useSearchParams();
    const country = params.get("query");
    const {
        stations: stationsByCountry,
        isLoading,
        error,
    } = useStations(`bycountrycodeexact/${country}`);
    console.log(country, params, stationsByCountry);
    return (
        !error && (
            <div>
                {!isLoading &&
                    stationsByCountry.map((st) => (
                        <div key={st.changeuuid}>
                            {st.name} {st.country}
                        </div>
                    ))}
            </div>
        )
    );
}

export default SearchedStations;

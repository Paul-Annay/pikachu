import { useSearchParams } from "react-router-dom";
import { useStations } from "../hooks/useStations";

function SearchedStations() {
    const [params] = useSearchParams();

    const country = params.get("query");
    const language = params.get("language");
    const name = params.get("name");

    let queryString = "";
    if (country) {
        queryString = `bycountrycodeexact/${country}`;
    } else if (language) {
        queryString = `bylanguage/${language}`;
    } else if (name) {
        queryString = `search?name=${name}`;
    }

    const {
        stations: stationsBySearch,
        isLoading,
        error,
    } = useStations(queryString);
    console.log(country, params, stationsBySearch);
    return (
        !error && (
            <div>
                {!isLoading &&
                    stationsBySearch.map((st) => (
                        <div key={st.changeuuid}>
                            {st.name} {st.country}
                        </div>
                    ))}
            </div>
        )
    );
}

export default SearchedStations;

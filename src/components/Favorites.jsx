import { useStation } from "../contexts/StationContext";

function Favorites() {
    const { favoriteStations, removeFromFavorites } = useStation();
    return (
        <div>
            {favoriteStations?.map((st) => (
                <div key={st.changeuuid}>
                    <h2>{st.name}</h2>
                    <h3>{st.country}</h3>
                    <button onClick={() => removeFromFavorites(st)}>❌</button>
                </div>
            ))}
        </div>
    );
}

export default Favorites;

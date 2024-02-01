import { InfinitySpin } from "react-loader-spinner";
import Station from "./Station";
import { useStation } from "../contexts/StationContext";

function StationList() {
    const { stations, isLoading } = useStation();
    return (
        <>
            {isLoading ? (
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />
            ) : (
                <div>
                    {stations.map((station) => (
                        <Station station={station} key={station.changeuuid} />
                    ))}
                </div>
            )}
        </>
    );
}

export default StationList;

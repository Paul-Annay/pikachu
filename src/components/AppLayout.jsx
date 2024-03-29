import { InfinitySpin } from "react-loader-spinner";
import { Outlet, useNavigation } from "react-router";
import FilterBox from "./FilterBox";
import Header from "./Header";
import Player from "./Player";
import Sidebar from "./Sidebar";

function AppLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <div className="">
            {isLoading && (
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"
                />
            )}

            <Sidebar />
            <div className="main">
                <Header />
                <FilterBox />
                <main className="outlet">
                    <Outlet />
                </main>
                <Player />
            </div>
        </div>
    );
}

export default AppLayout;

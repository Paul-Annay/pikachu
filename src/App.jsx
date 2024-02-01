import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Error from "./components/Error";
import Favorites from "./components/Favorites";
import Map from "./components/Map";
import { StationProvider } from "./contexts/StationContext";
import StationList from "./components/StationList";
import SearchedStations from "./components/SearchedStations";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,

        children: [
            {
                path: "/",
                element: <StationList />,
            },
            {
                path: "/map",
                element: <Map />,
                errorElement: <Error />,
            },
            { path: "/favorites", element: <Favorites /> },
            {
                path: "/search",
                search: "?query=value",
                element: <SearchedStations />,
            },
        ],
    },
]);

function App() {
    return (
        <StationProvider>
            <RouterProvider router={router} />;
        </StationProvider>
    );
}

export default App;

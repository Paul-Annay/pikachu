import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout";
import Error from "./Error";
import Favorites from "./Favorites";
import Map from "./Map";
import { StationProvider } from "./StationContext";
import StationList from "./StationList";
import SearchedStations from "./SearchedStations";

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
            { path: "/search", element: <SearchedStations /> },
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

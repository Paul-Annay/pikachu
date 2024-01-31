import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout";
import Error from "./Error";
import Favorites from "./Favorites";
import Map from "./Map";
import StationList from "./StationList";
import { useStations } from "./useStations";
import { StationProvider } from "./StationContext";

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

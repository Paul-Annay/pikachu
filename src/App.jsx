import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Error from "./Error";
import AppLayout from "./AppLayout";
import StationList from "./StationList";
import Favorites from "./Favorites";
import Map from "./Map";

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
    return <RouterProvider router={router} />;
}

export default App;

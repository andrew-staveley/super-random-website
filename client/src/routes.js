import Home from "./pages/Home.js"
import ErrorPage from "./pages/ErrorPage.js"

const routes = [
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    ];
export default routes;
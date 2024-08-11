import Home from "./pages/Home.js"
import ErrorPage from "./pages/ErrorPage.js"
import Login from "./pages/Login.js"
import Account from "./pages/Account.js"
import SignUp from "./pages/SignUp.js"
import Feed from "./pages/Feed.js"
import Post from "./pages/Post.js"
import Profile from "./pages/Profile.js"
import NewPost from "./pages/NewPost.js"

const routes = [
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/account",
        element: <Account />,
        errorElement: <ErrorPage />
    },
    {
        path: "/signup",
        element: <SignUp />,
        errorElement: <ErrorPage />
    },
    {
        path: "/feed",
        element: <Feed />,
        errorElement: <ErrorPage />
    },
    {
        path: "/post/:id",
        element: <Post />,
        errorElement: <ErrorPage />
    },
    {
        path: "/profile/:id",
        element: <Profile />,
        errorElement: <ErrorPage /> 
    },
    {
        path: "/new",
        element: <NewPost />,
        errorElement: <ErrorPage />,
    }
    ];
export default routes;
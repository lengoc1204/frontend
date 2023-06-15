
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Booking from "./Pages/Booking";
import NotFountPage from "./Pages/NotFoundPage";
import Layout from "./Components/Layout";
import Signin from "./Pages/Signin";
import TourList from "./Pages/TourList";
import Home from "./Pages/Home";
import SearchResult from "./Pages/SearchResult";
import Details from "./Pages/Details";
import Profile from "./Pages/Profile";
//import { useDispatch, useSelector, useStore } from "react-redux";
import Register from "./Pages/Register";

function App() {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      //errorElement: <NotFountPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/tours",
          element: <TourList />,
        },
        {
          path: "/tours/:tourId",
          element: <Details />,
        },
        {path: '/tours/:tourId/booking',
      element: <Booking />},
        {
          path: "/register",
          
          element: <Register />,
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {path: '/search',
        element: <SearchResult />
      },
        { path: "*", element: <NotFountPage /> },
      ],
    },
    {
      path: "/login",
      element: <Signin />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

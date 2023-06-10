import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import NotFountPage from "./Pages/NotFoundPage";
import Layout from "./Components/Layout";
import Signin from "./Pages/Signin";
import TourList from "./Pages/TourList";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import { useDispatch, useSelector, useStore } from "react-redux";
import TourDetail from "./Pages/TourDetail";
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
        {
          path: "/register",
          element: <Register />,
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

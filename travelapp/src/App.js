import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import Login from './Pages/Login';
import Layout from './Components/Layout';
import Signin from './Pages/Signin';
import TourList from './Pages/TourList';
import Home from './Pages/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <div>SAI GOI</div>,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Signin />
      },
      {
        path: "/tours",
        element: <TourList />
      },
      {
        path: "*",
        element: <div>Not Found Page</div>
      }
    ]
  },
  
])
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

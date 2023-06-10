import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Login from './Pages/Login';
import NotFountPage from './Pages/NotFoundPage';
import Layout from './Components/Layout';
import Signin from './Pages/Signin';
import TourList from './Pages/TourList';
import Home from './Pages/Home';
import Details from './Pages/Details';
import { useDispatch, useSelector, useStore } from "react-redux";
import TourDetail from './Pages/TourDetail';

function App() {
let userPath = {}
const user = useSelector(state => state.user.user);
console.log('user', user)
if (user !== null && user !== undefined){
  userPath = {path: "/profile",element: <h1 style={{paddingTop:'100px'}}>profile page</h1>}
  
}else{
  userPath = {path: "/profile",element: <h1 style={{paddingTop:'100px'}}>Login plz</h1>}
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    //errorElement: <NotFountPage />,
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
        path: "/tours/:tourId",
        element: <Details />
      },
      {userPath},
      {path: "*",
    element: <NotFountPage />}
      
    ]
  },
  
])

  return (
    <RouterProvider router={router} />
  );
}

export default App;

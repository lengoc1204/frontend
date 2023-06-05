import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import Layout from './Components/Layout';
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
        path: "/tour",
        element: <div>Tour page</div>
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

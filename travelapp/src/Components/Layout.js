import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Container } from "react-bootstrap";
import Home from "../Pages/Home";
const Layout = () => {
  return (
    <>
        <Navbar />

          <Outlet />
        
    </>
  )
};

export default Layout;
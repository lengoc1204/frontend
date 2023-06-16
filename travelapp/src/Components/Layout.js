import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";
import { Container } from "react-bootstrap";
import Home from "../Pages/Home";
import Footer from "./Footer";
const Layout = () => {
  return (
    <>
        <Navbar />
        <div style={{width: '100%', top: '120px', paddingBottom: '100px'}}>
          <Outlet />
        </div>
        <Footer />
          
        
    </>
  )
};

export default Layout;
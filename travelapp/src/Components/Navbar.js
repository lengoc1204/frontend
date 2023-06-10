import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/fly.png";
import {  NavDropdown } from 'react-bootstrap';
import user from "../images/user.png";
import { useDispatch, useSelector, useStore } from "react-redux";
import cookies from "react-cookies";
import LogoutUser from "../Actions/Logout";
import Apis, {endpoints} from "../Apis";
import { useHistory, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsStaggered,
  faXmark,
  faSearch,
  faPhoneAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [scrolledBar, setScrolledBar] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user.user)
  const onScrollPage = () => {
    let scrolledPercentage = 0;
    const winHeightPx =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    scrolledPercentage =
      ((scrolled / winHeightPx) * 100) % console.log(scrolledPercentage);
    setScrolledBar(scrolledPercentage);
    setScrolled(document.documentElement.scrollTop);

    if (scrolled >= 50) {
      let element = document.getElementById("nav");
      element.style.background = "gainsboro";
    } else {
      let element = document.getElementById("nav");
      element.style.background = "white";
    }
  };

  useEffect(async () => {
  
    onScrollPage();
    window.addEventListener("scroll", onScrollPage);
  }, []);

  const handleClick = () => {
    setClick(!click);
  };
  const Close = () => {
    setClick(false);
  };

  const logout = (event) => {
    event.preventDefault();
    cookies.remove("access_token");
    cookies.remove("user");
    dispatch(LogoutUser());
    navigate("/");
    window.location.reload();
  };

  let path = <>
      <li className="nav-item"><NavLink
                exact
                to="/login"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Login
              </NavLink></li>
    </>
    if (user !== null && user !== undefined) {
      path = <>
      <li className="nav-item">
        <NavLink exact
                to="/profile"
                className="nav-links">{user.username}</NavLink></li>
        <li className="nav-item"><NavLink
                exact
                to="/login"
                className="nav-links"
                onClick={logout}
              >
                Logout
              </NavLink></li>
        </>
    }

  return (
    <div>
      <div
        className={click ? "main-container" : ""}
        onClick={() => Close()}
      ></div>

      <nav id="nav" className="navbar" onClick={(e) => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink
            style={{ display: "flex" }}
            exact
            to="/"
            className="nav-logo"
          >
            <img
              alt=""
              src={logo}
              width="70"
              height="70"
              className="d-inline-block align-top app-title"
            />
            {"    "}E Travel
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/tours"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Tour
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/deal"
                className="nav-links"
                onClick={click ? handleClick : null}
              >
                Deal
              </NavLink>
            </li>
            {path}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <FontAwesomeIcon className="fa fa-bars" icon={faXmark} />
            ) : (
              <FontAwesomeIcon className="fa fa-bars" icon={faBarsStaggered} />
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;

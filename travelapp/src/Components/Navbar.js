import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/fly.png";
import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBarsStaggered, faXmark, faSearch, faPhoneAlt, faUserAlt} from '@fortawesome/free-solid-svg-icons';
function Navbar(){
  const [click, setClick] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [scrolledBar, setScrolledBar] = useState(0);

  const onScrollPage=()=>{let scrolledPercentage=0;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrolledPercentage= scrolled / winHeightPx *100%
    console.log(scrolledPercentage)
    setScrolledBar(scrolledPercentage)
    setScrolled(document.documentElement.scrollTop)

    if(scrolled>=50){
      let element = document.getElementById('nav')
      element.style.background = 'gainsboro'
    }else{
      let element = document.getElementById('nav')
      element.style.background = 'white'
    }
  }

  useEffect(()=>{
    onScrollPage();
    window.addEventListener("scroll", onScrollPage)
  })

  const handleClick = ()=>{
    setClick(!click);
  }
  const Close = () => {
    setClick(false);
  }

  return(
    <div>
      <div className={click ? "main-container" : ""} onClick={()=>Close()}></div>
    
      <nav id="nav" className="navbar" onClick={e=>e.stopPropagation()}>
         
        <div className="nav-container">
            <NavLink style={{display: 'flex'}} exact to="/" className="nav-logo">
              <img
                            alt=""
                            src={logo}
                            width="70"
                            height="70"
                            className="d-inline-block align-top app-title"
                            />{"    "}E Travel
            </NavLink>

            <ul className={click? "nav-menu active" : "nav-menu" }> 
              <li className="nav-item">
                <NavLink exact to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click? handleClick :null}
                >Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/tours"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click? handleClick :null}
                >Tour</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/contact"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click? handleClick :null}
                >Contact</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/deal"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click? handleClick :null}
                >Deal</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={click? handleClick :null}
                >Login</NavLink>
              </li>
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              {click? <FontAwesomeIcon className="fa fa-bars" icon={faXmark} /> : <FontAwesomeIcon className="fa fa-bars" icon={faBarsStaggered} />}
              <i className={click? "fa fa-times" : "fa fa-bars"}></i>
            </div>
        </div>

      </nav>
    </div>
  )
}
export default Navbar;
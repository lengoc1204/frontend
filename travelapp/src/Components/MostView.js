import React, { Component, useEffect , useState} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'moment-timezone';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Apis, {endpoints} from "../Apis";
import {Card, Image} from "react-bootstrap";
import App from '../App.css';
import {faStar, faCalendarDays, faTimesCircle, faEye} from '@fortawesome/free-solid-svg-icons';
import { NumericFormat } from 'react-number-format';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  
export default function MostView(){
    const [mostview, setMostview] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        Apis.get(endpoints['mostviewURL'])
        .then(res=>{
            setMostview(res.data);
            setLoading(true);
            console.log('data', res.data)
        })
        .catch(err => {
            setLoading(false);
            setError(err);
        });
    }, [])
    return(
        <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        //autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        //deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
            {Array.isArray(mostview) ? (mostview).map(item=>{
              return (
                <Link key={item.tour.id} to={`/products/${item.tour.id}`} style={{color: 'black'}}>
                  <div className="single-destinations-list text-center">
                    
                    <div className="thumb">
                    {item.tour.discount ? (
                      <img
                        src={item.tour.image}
                      ></img>
                    ) : (
                      <img
                        src={item.tour.image}
                      ></img>
                    )}
                    <div className="d-list-btn-wrap">
                        <div className="d-list-btn viaje-go-top">
                            <button style={{background: "#F3941E", color:"white"}} className="btn btn-search" href="#/contact" tabindex="0">Book Now 
                                <i className="fa fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                    </div>
                    <div className="details">
                      <h4
                        className="title"
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        as="a"
                      >
                        {item.tour.name}
                      </h4>
                      <ul className="tp-list-meta border-bt-dot">
                        <li>
                          <FontAwesomeIcon
                            className="i"
                            icon={faCalendarDays}
                          />
                          <Moment format="YYYY/MM/DD" withTitle>
                            {item.tour.time_start}
                          </Moment>
                        </li>
                        <li>
                            <FontAwesomeIcon
                            className="i"
                            icon={faTimesCircle}
                          />
                          {item.tour.duration}
                        </li>
                        <li>
                            <FontAwesomeIcon
                            className="i"
                            icon={faEye}
                          />{item.views}
                        </li>
                        <li>
                            <FontAwesomeIcon
                            className="i"
                            icon={faEye}
                          />{item.tour.discount}
                        </li>
                      </ul>
                      <div className="tp-price-meta tp-price-meta-cl">
                        <p>Price</p>
                        <div >
                            <div className="h2">
                                <small>
                                    {item.tour.discount ? (
                                    <NumericFormat
                                        value={item.tour.get_final_price}
                                        displayType={"text"}
                                        thousandSeparator={"."}
                                        decimalSeparator={","}
                                    />
                                    ) : (
                                    <NumericFormat
                                        value={item.tour.price}
                                        displayType={"text"}
                                        thousandSeparator={"."}
                                        decimalSeparator={","}
                                    />
                                    )}
                                </small>
                            </div>
                            {item.tour.discount ? (<em>{item.tour.discount} % </em>):("")}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }): <></> }
      </Carousel>

    )
}


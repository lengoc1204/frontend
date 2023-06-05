import 'moment-timezone';
import Moment from 'react-moment';
import React, { Component, useEffect , useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Apis, {endpoints} from "../Apis";import {faStar, faCalendarDays, faTimesCircle, faEye} from '@fortawesome/free-solid-svg-icons';
import { NumericFormat } from 'react-number-format';
import Slider from "react-slick";


export default function MostViewSilder(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    };
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
        <Slider {...settings}>
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
        </Slider>
    )
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style}}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, right:"-90px!important", color:"red"}}
        onClick={onClick}
      />
    );
  } 
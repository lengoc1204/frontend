import React, { Component, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "moment-timezone";
import "./mostview.css";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Apis, { endpoints } from "../Apis";
import { Card, Image, Row, Col } from "react-bootstrap";
import { faCalendarDays, e } from "@fortawesome/free-solid-svg-icons";
import { NumericFormat } from "react-number-format";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function MostView() {
  const [mostview, setMostview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Apis.get(endpoints["mostviewURL"])
      .then((res) => {
        setMostview(res.data);
        setLoading(true);
        console.log("data", res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);
  return (
    <div className="most-view-list-slider">
      <div className="container">
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
          {Array.isArray(mostview) ? (
            mostview.map((item) => {
              return <MostViewItem obj={item} />;
            })
          ) : (
            <></>
          )}
        </Carousel>
      </div>
    </div>
  );
}

function MostViewItem(props) {
  return (
    <div className="most-view-item">
      <div className="single-view">
        <div className="view-img">
          <span className="tour-label">Discount</span>
          <img src={props.obj.tour.image} alt="etravel" />
          <div className="btn-tour-detail">
            <div className="tour-btn">
              <button>Detail</button>
            </div>
          </div>
        </div>
        <div className="most-view-detail">
          <h4
            className="tour-title"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {props.obj.tour.name}
          </h4>
          <p className="tour-destination">{props.obj.tour.destination}</p>
          <ul className="list-detail border-bt-dot">
            <li>
              <FontAwesomeIcon className="i" icon={faCalendarDays} />
              <Moment format="YYYY/MM/DD" withTitle>
                {props.obj.tour.time_start}
              </Moment>
            </li>
            <li>
              <i className="fa fa-clock-o"></i> {props.obj.tour.duration}
            </li>
            <li>
              <i className="fa fa-star"></i> rate
            </li>
          </ul>
          <div className="tour-price">
            <p>Price</p>
            <h2>
              <NumericFormat
                value={props.obj.tour.price}
                displayType={"text"}
                thousandSeparator={"."}
                decimalSeparator={","}
              />{" "}
              <small>₫</small>
            </h2>
            <del>
              620<span>$</span>
            </del>
          </div>
        </div>
      </div>
    </div>
  );
}

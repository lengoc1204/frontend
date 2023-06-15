import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router";
import Moment from "react-moment";
import { Row, Col, Container } from "react-bootstrap";
import loginImage from "../images/lg.jpg";
import { CircularProgress } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Apis, { endpoints } from "../Apis";
export default function SearchResult() {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect( () => {
    setLoading(true);
     Apis.get(`${endpoints["tour"]}${location.search}`)
      .then((res) => {
        setLoading(false);
        setTour(res.data.results);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [location.search]);

  if (tour !== "" && tour.length !== 0 && tour !== null && tour !== undefined) {
    return (
      <div>
        <div
          style={{ backgroundImage: `url(${loginImage})`, height: "600px" }}
          className="tour-list-breadcrumb-area jarallax"
        >
          <div className="container">
            <Row>
              <Col lg={12}>
                <div className="inner">
                  <h1 className="page-title">Tour List</h1>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="list-tour-area">
          <Container>
            <Row>
              <Col xl="3" lg={{ span: 4, order: 12 }}>
                <div className="search-area">
                  <div className="search-tour-side">
                    <div className="tour-list-search">
                      <form className="search-tour-form">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Search"
                            fdprocessedid="8y586"
                          />
                        </div>
                        <button
                          className="submit-btn"
                          type="submit"
                          fdprocessedid="dlqkeb"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl="9" lg={{ span: 8, order: 12 }}>
                {loading && <CircularProgress style={{ left: "50%" }} />}
                <div className="tour-list-area">
                  {tour.map((u, index) => (
                    <SingleTour key={index} obj={u} />
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          style={{ backgroundImage: `url(${loginImage})`, height: "600px" }}
          className="tour-list-breadcrumb-area jarallax"
        >
          <div className="container">
            <Row>
              <Col lg={12}>
                <div className="inner">
                  <h1 className="page-title">Tour List</h1>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="list-tour-area">
          <Container>
            <Row>
              <Col xl="3" lg={{ span: 4, order: 12 }}>
                <div className="search-area">
                  <div className="search-tour-side">
                    <div className="tour-list-search">
                      <form className="search-tour-form">
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Search"
                            fdprocessedid="8y586"
                          />
                        </div>
                        <button
                          className="submit-btn"
                          type="submit"
                          fdprocessedid="dlqkeb"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xl="9" lg={{ span: 8, order: 12 }}>
                {loading && <CircularProgress style={{ left: "50%" }} />}
                <div className="tour-list-area">
                  <h2>not found</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

function SingleTour(props) {
  let remain = "";
  let price = "";
  let return_rate = (rate) => {
    if (rate !== null) {
      return rate;
    } else {
      return 0;
    }
  };
  if (props.obj.slot <= 0) {
    remain = (
      <>
        <span>Out of slot:</span>
        <span className="slot">{props.obj.slot}</span>
      </>
    );
  } else {
    remain = (
      <>
        <span>Remaining:</span>
        <span className="slot">{props.obj.slot}</span>
      </>
    );
  }

  if (props.obj.discount >= 1) {
    price = (
      <>
        <div className="price_present">
          <span>{props.obj.price} VND</span>
        </div>
        <div className="d-flex align-items-center">
          <span class="material-icons-outlined">trending_down</span>
        </div>
        <div className="price_discount">
          <span>{props.obj.discount} VND</span>
        </div>
      </>
    );
  } else {
    price = (
      <>
        <div className="price_present">
          <span>{props.obj.price} VND</span>
        </div>
      </>
    );
  }

  let path = `/tours/${props.obj.id}/`;

  return (
    <Link to={path}>
      <div className="item">
        <div className="tour-img" style={{ marginBottom: "unset" }}>
          <img src={props.obj.image} />
        </div>
        <div className="tour-detail">
          <div className="tour-item-review">
            <i className="tour-star fa fa-star"></i>
            <span>{return_rate(props.obj.rate[0].rate__avg)}</span>
          </div>
          <p className="location">
            <FontAwesomeIcon className="i" icon={faLocationDot} />
            {props.obj.destination.name}
          </p>
          <h4 className="title">
            <a href="#/tour-details">{props.obj.name}</a>
          </h4>
          <div className="list-price">
            <ul className="list d-inline-block">
              <li>
                <i className="fa fa-calendar-o"></i>
                <Moment format="YYYY/MM/DD" withTitle>
                  {props.obj.time_start}
                </Moment>
              </li>
              <li>
                <i className="fa fa-clock-o"></i>
                {props.obj.duration}
              </li>
              <li>
                <i className="fa fa-star"></i>
                {props.obj.slot}
              </li>
            </ul>
            <div className="price d-inline-block">
              <p>Price</p>
              <h2>
                <NumericFormat
                  value={props.obj.price}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                />
                <span>₫</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

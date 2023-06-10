import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import {
  Badge,
  Col,
  Row,
  Spinner,
  Image,
  Form,
  Button,
  Container,
  Card,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneArrival,
  faPlaneDeparture,
  faClockFour,
  faCalendarTimes,
  faTicket,
  faTag
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-bootstrap/Carousel";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Apis, { endpoints } from "../Apis";
import loginImage from "../images/lg.jpg";
import "./tour-detail.css";
import "react-multi-carousel/lib/styles.css";

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

export default function Details() {
  const [item, setItem] = useState([]);
  const [error, setError] = useState(null) 

  let { tourId } = useParams();

  useEffect(() => {
    let loadTourDetail = async () => {
      try {
        let res = await Apis.get(endpoints["tour-detail"](tourId));
        setItem(res.data);
        console.log("detail", res.data);
      } catch (err) {
        console.error(err);
      }
      
    };
    Apis.get(endpoints["addTourViewURL"](tourId)).then(res => {
        console.log("View===", res.data)
      })
      .catch(err =>{
        console.log(err)
      });
      loadTourDetail()
    
  }, []);

  return (
    <div>
      <div
        style={{ backgroundImage: `url(${loginImage})`, height: "600px" }}
        className="tour-list-breadcrumb-area"
      ></div>
      <div className="tour-details-area">
        <div className="tour-details">
          <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <div>
              <Row className="tour-detail-img">
                <Col sm={7} className="tour-img">
                  <img src={item.image} />
                </Col>
                <Col sm={5} className="tour-img-detail">
                  <Carousel style={{ paddingBottom: "30px" }}>
                    {item.tour_image &&
                      item.tour_image.map((i) => {
                        return (
                          <Carousel.Item style={{ height: "300px" }}>
                            <img
                              className="d-block w-100 img-detail"
                              src={`https://etravel12.pythonanywhere.com/${i.image}`}
                              alt="First slide"
                            />
                          </Carousel.Item>
                        );
                      })}
                  </Carousel>
                  <div className="tour-info">
                    <div className="tour-price">
                      <h2 className="price">
                        <NumericFormat
                          value={item.get_final_price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        />
                        <span>₫</span>
                      </h2>
                      {item.discount ? (
                        <del className="price">
                          <h4>
                            <NumericFormat
                              value={item.price}
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                            />
                            <span>₫</span>
                          </h4>
                        </del>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="btn-booking">
                    <button>BOOKING NOW</button>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="second-line">
              <Row>
                <Col xl="4" lg="4" className="rating-side">
                  <h2>Rating tour</h2>
                </Col>
                <Col className="content-side" xl={8} lg={8}>
                  <div className="tour-info">
                    <h2 className="tour-name">{item.name}</h2>
                    <ul>
                      <li>
                        <FontAwesomeIcon className="i" icon={faPlaneArrival} />
                        {item.destination && item.destination.name}
                      </li>
                      <li>
                        {" "}
                        <FontAwesomeIcon
                          className="i"
                          icon={faPlaneDeparture}
                        />
                        {item.departure && item.departure.name}
                      </li>
                      <li>
                        {" "}
                        <FontAwesomeIcon className="i" icon={faClockFour} />
                        {item.duration} days
                      </li>
                      <li>
                        <FontAwesomeIcon className="i" icon={faCalendarTimes} />
                        <Moment format="YYYY/MM/DD" withTitle>
                          {item.time_start}
                        </Moment>
                      </li>
                      <li>
                        <FontAwesomeIcon className="i" icon={faTicket} />
                        {item.slot} slots
                      </li>
                    </ul>
                  </div>
                  <div className="detail-price">
                    <h2 className="tour-name"><FontAwesomeIcon className="i" icon={faTag} />Details tour price list</h2>
                    <hr />
                  <Table >
                    <thead>
                      <tr>
                        <th>Price / Age</th>
                        <th>Adult</th>
                        <th>Children (5 - 11 years old)</th>
                        <th>Children (2 - 5 years old)</th>
                        <th>{"< "}2 years old</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Price</td>
                        <td><NumericFormat
                          value={item.price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        /></td>
                        <td><NumericFormat
                          value={item.children11_price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        /></td>
                        <td><NumericFormat
                          value={item.children5_price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        /></td>
                        <td><NumericFormat
                          value={item.children2_price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        /></td>
                      </tr>
                      <tr>
          <td colSpan={3}>Single room surcharge</td>
          <td colSpan={2}><NumericFormat
                          value={item.single_room}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        /></td>
        </tr>
                    </tbody>
                  </Table>
                  </div>
                  <div className="tour-description">
                    <h3 className="tour-name">Description</h3>
                    <span>{item.content}</span>
                  </div>
                </Col>
               
              </Row>
            </div>
            <div className="including">
              <h4 class="tour-name">Included</h4>
              <Row>
                <Col xl={4} sm={6}>
                  <div class="included-item">
                    <img
                      src="/react/viaje/assets/img/icons/15.png"
                      alt="icons"
                    />
                    <h6 className="tour-name">Food</h6>
                    <p>3 breakfasts, 3 dinners</p>
                  </div>
                </Col>
                <Col xl={4} sm={6}>
                  <div class="included-item">
                    <img
                      src="/react/viaje/assets/img/icons/15.png"
                      alt="icons"
                    />
                    <h6 className="tour-name">Food</h6>
                    <p>3 breakfasts, 3 dinners</p>
                  </div>
                </Col>
                <Col xl={4} sm={6}>
                  <div class="included-item">
                    <img
                      src="/react/viaje/assets/img/icons/15.png"
                      alt="icons"
                    />
                    <h6 className="tour-name">Food</h6>
                    <p>3 breakfasts, 3 dinners</p>
                  </div>
                </Col>
                <Col xl={4} sm={6}>
                  <div class="included-item">
                    <img
                      src="/react/viaje/assets/img/icons/15.png"
                      alt="icons"
                    />
                    <h6 className="tour-name">Food</h6>
                    <p>3 breakfasts, 3 dinners</p>
                  </div>
                </Col>
                <Col xl={4} sm={6}>
                  <div class="included-item">
                    <img
                      src="/react/viaje/assets/img/icons/15.png"
                      alt="icons"
                    />
                    <h6 className="tour-name">Food</h6>
                    <p>3 breakfasts, 3 dinners</p>
                  </div>
                </Col>
                <Col xl={4} sm={6}>
                  <div class="included-item">
                    <img
                      src="/react/viaje/assets/img/icons/15.png"
                      alt="icons"
                    />
                    <h6 className="tour-name">Food</h6>
                    <p>3 breakfasts, 3 dinners</p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

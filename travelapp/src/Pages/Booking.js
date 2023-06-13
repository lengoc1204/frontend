import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import cookies from "react-cookies";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import cookie from "react-cookies";
import bookingImage from "../images/booking.jpg";
import "./tour-detail.css";
import axios from "axios";
import "./booking.css";
import { useParams, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import {
  faPlaneArrival,
  faPlaneDeparture,
  faClockFour,
  faCalendarTimes,
  faTicket,
  faTag,
  faPhoneAlt,
  faLocationArrow,
  faUserCheck,
  faBaby,
  faDotCircle,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import Apis, { endpoints } from "../Apis";

export default function Booking() {
  const [tour, setTour] = useState([]);
  const [adult, setAdult] = useState(1);
  const [child2, setChild2] = useState(0);
  const [child5, setChild5] = useState(0);
  const [child11, setChild11] = useState(0);
  const [room, setRoom] = useState(0);
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const [status, setStatus] = useState("p");

  const { tourId } = useParams();

  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const [is_open, setIs_open] = useState(false);

  let openMOdal = () => {
    setIs_open(true);
  };
  let closeMOdal = () => {
    setIs_open(false);
  };
  useEffect(async () => {
    try {
      let res = await Apis.get(endpoints["tour-detail"](tourId));
      setTour(res.data);
      let res_user = await Apis.get(endpoints["current_user"], {
        headers: {
          Authorization: `Bearer ${cookies.load("access_token")}`,
        },
      });
      setUser(res_user.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const add_booking = async (event) => {
    event.preventDefault();
    try {
       let res = await Apis.post(
         endpoints["add_booking"](tourId),
         {
           adult: adult,
           children2: child2,
          children5: child5,
           children11: child11,
           room: room,
           note: note,
           address: address,
           phone_number: phone_number,
         },
         {
           headers: {
             Authorization: `Bearer ${cookie.load("access_token")}`,
           },
         }
       );
      success_notice();
       console.log("booking", res.data)
       setTimeout(() => {
         openMOdal();
       }, 1000);
     } catch (err) {
       console.error(err);
      fail_notice();
     }
  };
  let fail_notice = () => {
    toast.warn("Có lỗi kìa má ôi!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  let success_notice = () => {
    toast.success("Success, Check your booking infomation in Profile page", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <ToastContainer />
      <div
        style={{ backgroundImage: `url(${bookingImage})`, height: "600px" }}
        className="tour-list-breadcrumb-area"
      >
        <div className="container">
          <Row className="head">
            <Col lg={12}>
              <div className="inner">
                <h1 className="page-title">BOOKING</h1>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="tour-details-area">
        <div className="tour-details">
          <div style={{ padding: "20px" }}>
            <Row className="tour-detail-img">
              <Col sm={7} className="tour-img" >
                <img style={{borderRadius: '0px'}} src={tour.image} />
              </Col>
              <Col sm={5} className="tour-img-detail">
                <h2 style={{ paddingBottom: "20px" }} className="tour-name">
                  {tour.name}
                </h2>
                <div className="tour-info">
                  <div className="tour-price">
                    <h2 className="price">
                      <NumericFormat
                        value={tour.get_final_price}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                      />
                      <span>₫</span>
                    </h2>
                    {tour.discount ? (
                      <del className="price">
                        <h4>
                          <NumericFormat
                            value={tour.price}
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
                  <ul>
                    <li>
                      <FontAwesomeIcon className="i" icon={faPlaneArrival} />
                      {tour.destination && tour.destination.name}
                    </li>
                    <li>
                      {" "}
                      <FontAwesomeIcon className="i" icon={faPlaneDeparture} />
                      {tour.departure && tour.departure.name}
                    </li>
                    <li>
                      {" "}
                      <FontAwesomeIcon className="i" icon={faClockFour} />
                      {tour.duration} days
                    </li>
                    <li>
                      <FontAwesomeIcon className="i" icon={faCalendarTimes} />
                      <Moment format="YYYY/MM/DD" withTitle>
                        {tour.time_start}
                      </Moment>
                    </li>
                    <li>
                      <FontAwesomeIcon className="i" icon={faTicket} />
                      {tour.slot} slots
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <div className="detail-price">
                <h2 className="tour-name">
                  <FontAwesomeIcon className="i" icon={faTag} />
                  Details tour price list
                </h2>
                <hr />
                <Table>
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
                      <td>
                        <NumericFormat
                          value={tour.price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        />
                      </td>
                      <td>
                        <NumericFormat
                          value={tour.children11_price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        />
                      </td>
                      <td>
                        <NumericFormat
                          value={tour.children5_price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        />
                      </td>
                      <td>
                        <NumericFormat
                          value={tour.children2_price}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>Single room surcharge</td>
                      <td colSpan={2}>
                        <NumericFormat
                          value={tour.single_room}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                        />
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Row>
            <Row>
              <h2 style={{ textAlign: "center" }} className="tour-name">
                <FontAwesomeIcon className="i" icon={faTag} />
                Booking Info
              </h2>
              <div className="booking-form">
                <form onSubmit={add_booking}>
                <div className="row">
                  <div className="col-sm-6 ">
                    <div className="form-group ">
                      <span className="form-label">
                      <FontAwesomeIcon className="i" icon={faPhoneAlt} />{" "}Phone number:</span>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        onChange={(e) => setPhone_number(e.target.value)}
                        value={phone_number}
                        className="form-control"
                      />{" "}
                    </div>
                  </div>
                  <div className="col-sm-6 ">
                    <div className="form-group ">
                      <span className="form-label">
                      <FontAwesomeIcon className="i" icon={faLocationArrow} />{" "}Address:</span>
                      <input
                        style={{ color: "black" }}
                        type="text"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        className="form-control"
                      />{" "}
                    </div>
                  </div>
                </div>
                <div className="row count">
                  <div className="col-sm-6 col-md-2">
                    <div className="form-group ">
                      <span className="form-label">
                      <FontAwesomeIcon className="i" icon={faUserCheck} />{" "}Adult</span>
                      <input
                        type="number"
                        style={{ color: "black" }}
                        min="1"
                        max="40"
                        value={adult}
                        onChange={(e) => setAdult(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group ">
                      <span className="form-label">
                      <FontAwesomeIcon className="i" icon={faBaby} />{' '}Tre em duoi 2 tuoi</span>
                      <input
                        type="number"
                        style={{ color: "black" }}
                        min="0"
                        max="40"
                        value={child2}
                        onChange={(e) => setChild2(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group ">
                      <span className="form-label"><FontAwesomeIcon className="i" icon={faBaby} />{' '}Tre em 2 - 5 tuoi</span>
                      <input
                        type="number"
                        style={{ color: "black" }}
                        min="0"
                        max="40"
                        value={child5}
                        onChange={(e) => setChild5(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group ">
                      <span className="form-label"><FontAwesomeIcon className="i" icon={faBaby} />{' '}Tre em tren 5 tuoi</span>
                      <input
                        type="number"
                        style={{ color: "black" }}
                        min="0"
                        max="40"
                        value={child11}
                        onChange={(e) => setChild11(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <div className="form-group ">
                      <span className="form-label"><FontAwesomeIcon className="i" icon={faDoorOpen} />{' '}Room</span>
                      <input
                        type="number"
                        style={{ color: "black" }}
                        min="0"
                        max="40"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  
                  <div className="col-sm-6">
                  <div className="form-group ">
                        <span className="form-label">Note:</span>
                        <textarea className="form-control" value={note}
                          onChange={(e) => setNote(e.target.value)}></textarea>
                        
                      </div>
                  </div>

                </div><button type="submit" >Submit</button></form>
                
              </div>
            </Row>
          </div>
        </div>
      </div>

    </>
  );
}

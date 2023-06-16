import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import cookies from "react-cookies";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import cookie from "react-cookies";
import loginImage from "../images/lg.jpg";
import bookingImage from "../images/booking.jpg";
//import "./tour-detail.css";
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
} from "@fortawesome/free-solid-svg-icons";
import Apis, { endpoints } from "../Apis";

export default function BookingTour() {
  const [tour, setTour] = useState([]);
  const [adult, setAdult] = useState(1);
  const [child2, setChild2] = useState(0);
  const [child5, setChild5] = useState(0);
  const [child11, setChild11] = useState(0);
  const [room, setRoom] = useState(0);
  const [address, setAddress] = useState(null);
  const [note, setNote] = useState(null);
  const [phone_number, setPhone_number] = useState(null);

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
  useEffect( () => {
    getUser()
    fetchTour()
  }, []);

  const getUser =async()=>{
    let res_user = await Apis.get(endpoints["current_user"], {
        headers: {
          Authorization: `Bearer ${cookies.load("access_token")}`,
        },
      });
      setUser(res_user.data);
  }
  const fetchTour=async()=>{
    let res = await Apis.get(endpoints["tour-detail"](tourId));
      setTour(res.data);
  }

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
    toast.success("Success", {
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
      <div className="booking" style={{ backgroundImage: `url(${bookingImage})`, height:'100vh'}}>
            <div className="booking-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-md-push-5">
                            <div className="booking-right">
                                <h1>BOOKING</h1>
                                <h3>{tour.name}</h3>
                            </div>

                        </div>
                        <div className="col-md-4 col-md-pull-7">
                            <div className="booking-form">
                                <form>
                                <div class="form-group">
                                    <span class="form-label">Phone number</span>
                                    <input class="form-control" type="text" placeholder="Enter your phone number"  />
                                </div>
                                <div className="row">
                                    <div className="col-sm-3">
                                    <div className="form-group">
                    <span>Adult</span>
                    <input
                      type="number" style={{color: 'black'}}
                      min="1"
                      max="40"
                      value={adult}
                      onChange={(e) => setAdult(e.target.value)}
                      className="form-control"
                    />
                  </div>

                                    </div>

                                </div>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
      </div>
    </>
  );
}

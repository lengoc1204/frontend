import { useEffect, useRef, useState } from "react";
import { Form, Nav, Row, Col, Tab, Modal } from "react-bootstrap";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import cookie from "react-cookies";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Apis, { endpoints } from "../Apis";
import LogoutUser from "../Actions/Logout";
import { toast, ToastContainer } from "react-toastify";
import bookingImage from "../images/booking.jpg";
import $ from "jquery";
import "./profile.css";
import avataar from "../images/ava.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPlaneDeparture,
  faCalendarDays,
  faLockOpen,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  const [customer, setCustomer] = useState(null);
  const [email, setEmail] = useState([]);
  const [last_name, setLast_name] = useState([]);
  const [first_name, setFirst_name] = useState([]);
  const avatar = useRef();
  const [img, setImg] = useState(null);
  const [booking, setBooking] = useState(null);
  const [change, setChange] = useState(1);

  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [is_open_confirm, setIs_open_confirm] = useState(false);
  const [is_open_update, setIs_open_update] = useState(false);

  const [error, setError] = useState(null);
  const [id, setID] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getBookingList();
  }, [change]);

  const getBookingList = async () => {
    let resbooking = await Apis.get(endpoints["get_booking_by_user"], {
      headers: {
        Authorization: `Bearer ${cookie.load("access_token")}`,
      },
    });
    setBooking(resbooking.data);
    console.log(resbooking);
  };
  const getUser = async () => {
    let res = await Apis.get(endpoints["current_user"], {
      headers: {
        Authorization: `Bearer ${cookie.load("access_token")}`,
      },
    });
    setCustomer(res.data);
    console.log("user", res.data);
    setFirst_name(res.data.first_name);
    setImg(res.data.avatar);
    setLast_name(res.data.last_name);
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

  const logout = (event) => {
    event.preventDefault();
    cookie.remove("access_token");
    cookie.remove("user");
    dispatch(LogoutUser());
    navigate("/");
    window.location.reload();
  };
  let openModal_confirm = (e) => {
    setID($(e.target).closest(".single-view").attr("id"));
    console.log($(e.target).closest(".single-view").attr("id"));
    setIs_open_confirm(true);
  };
  let closeModal_confirm = () => {
    setIs_open_confirm(false);
    setID(0);
  };
  let openModal_update = (e) => {
    setID($(e.target).closest("tr").attr("id"));
    setIs_open_update(true);
  };

  let closeModal_update = () => {
    setIs_open_update(false);
    setID(0);
  };

  let cancel_booking = async (e) => {
    e.preventDefault();
    try {
      let res = await Apis.post(
        endpoints["cancel_booking"],
        {
          tour: id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.load("access_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      success_notice();
      setChange(change + 1);
      closeModal_confirm();
      console.log(res.data);
    } catch (err) {
      console.error(err);
      fail_notice();
    }
  };

  const update_info = async (e) => {
    //done
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("last_name", last_name);
    formdata.append("first_name", first_name);
    formdata.append("id", customer.id);
    formdata.append("avatar", avatar.current.files[0]);

    try {
      let res = await Apis.patch(
        endpoints["get_user_by_id"](customer.id),
        formdata,
        {
          headers: {
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        }
      );
      success_notice();
      setCustomer(res.data);
      setChange(10);
    } catch (er) {
      console.error(er);
      fail_notice();
    }
  };

  const change_password = async (e) => {
    //done
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("current_password", current_password);
    formdata.append("new_password", new_password);
    //formdata.append("id" , customer.id)
    //formdata.append("confirm_password" , confirm_password)
    if (confirm_password === new_password) {
      try {
        let res = await Apis.post(endpoints["change_password"], formdata, {
          headers: {
            Authorization: `Bearer ${cookie.load("access_token")}`,
          },
        });
        success_notice();
        //setCustomer(res.data)
        setChange(10);
      } catch (er) {
        console.error(er);
        fail_notice();
      }
    } else {
      setError("Passwords must match");
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="profile"
        style={{ backgroundImage: `url(${bookingImage})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-inner">
                <h1
                  style={{
                    color: "white",
                    fontSize: "55px",
                    fontWeight: "700",
                  }}
                  className="page-title"
                >
                  User Profile
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-profile">
        <div className="container">
          <Tab.Container id="left-tabs-example" defaultActiveKey="user-info" >
            <Row>
              <Col xl={10} lg={12}>
                <Row>
                  <Col lg={4}>
                    <Tab.Content className="tab-content">
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="user-info">
                            <FontAwesomeIcon
                              className="fa fa-bars"
                              icon={faUserCircle}
                            />{" "}
                            Profile
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="booking-list">
                            <FontAwesomeIcon
                              className="fa fa-bars"
                              icon={faPlaneDeparture}
                            />{" "}
                            Booking list
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="change-password">
                            <FontAwesomeIcon
                              className="fa fa-bars"
                              icon={faLockOpen}
                            />{" "}
                            Change password
                          </Nav.Link>
                        </Nav.Item>
                            <button onClick={logout} className="logout-btn" ><FontAwesomeIcon
                              className="fa fa-bars"
                              icon={faArrowRightFromBracket}
                            />{" "}
                            Logout</button>
                      </Nav>
                    </Tab.Content>
                  </Col>
                  <Col xl={{ span: 7, offset: 1 }} lg={8}>
                    <Tab.Content>
                      <Tab.Pane eventKey="user-info">
                        <div className="user-detail">
                          <h3 className="user-details-title">Profile</h3>
                          <div className="img-upload">
                            {img ? (
                              <div
                                className="avatar-cover"
                                style={{
                                  backgroundImage: `url(https://etravel12.pythonanywhere.com${img})`,
                                }}
                              ></div>
                            ) : (
                              <div
                                className="avatar-cover"
                                style={{ backgroundImage: `url(${avataar})` }}
                              ></div>
                            )}

                            <div className="avatar-edit">
                              {/* <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" ref={avatar} />
            <label class="btn btn-transparent" for="imageUpload"><i class="fa fa-picture-o"></i>Change Photo</label> */}
                              <h4 class="name">
                                {" "}
                                {last_name} {first_name}
                              </h4>
                            </div>
                          </div>
                          <form onSubmit={update_info} className="profile-form">
                            <Row>
                              <Col md={6}>
                                <label className="profile-input">
                                  <span className="input-title">
                                    First Name
                                  </span>
                                  <input
                                    onChange={(e) =>
                                      setFirst_name(e.target.value)
                                    }
                                    value={first_name}
                                    type="text"
                                    name="first-name"
                                  />
                                </label>
                              </Col>
                              <Col md={6}>
                                <label className="profile-input">
                                  <span className="input-title">Last Name</span>
                                  <input
                                    onChange={(e) =>
                                      setLast_name(e.target.value)
                                    }
                                    value={last_name}
                                    type="text"
                                    name="last-name"
                                  />
                                </label>
                              </Col>
                              <Col md={6}>
                                <div className="avatar-edit">
                                  <input
                                    type="file"
                                    id="imageUpload"
                                    ref={avatar}
                                  />
                                  <label
                                    class="btn btn-transparent"
                                    for="imageUpload"
                                  >
                                    <i class="fa fa-picture-o"></i>Change avatar
                                  </label>
                                </div>
                              </Col>
                              <Col lg={12}>
                                <button
                                  className="btn btn-submit"
                                  type="submit"
                                >
                                  Save
                                </button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="booking-list">
                        <Modal
                          show={is_open_confirm}
                          onHide={closeModal_confirm}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Woohoo, you are reading this text in a modal!
                          </Modal.Body>
                          <Modal.Footer>
                            <button
                              variant="secondary"
                              onClick={closeModal_confirm}
                            >
                              Close
                            </button>
                            <form onSubmit={cancel_booking}>
                              <button type="submit" className="btn btn-primary">
                                Cancel tour
                              </button>
                            </form>
                          </Modal.Footer>
                        </Modal>

                        <div className="user-detail">
                          <h3 className="user-details-title">Booking recent</h3>
                          <Row>
                            {Array.isArray(booking) ? (
                              booking.map((b, index) => {
                                return (
                                  <BookingItem
                                    openModal_confirm={openModal_confirm}
                                    key={index}
                                    booking={b}
                                  />
                                );
                              })
                            ) : (
                              <h2>Nothing for youuuu</h2>
                            )}
                          </Row>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="change-password">
                        <div className="user-detail">
                          <h3 className="user-details-title">
                            Change password
                          </h3>
                          <form
                            onSubmit={change_password}
                            className="profile-form"
                          >
                            <Row>
                              <Col lg={7}>
                                <label className="profile-input">
                                  <span className="input-title mb-3">
                                    Change your password
                                  </span>
                                  <input
                                    value={current_password}
                                    onChange={(e) =>
                                      setCurrentPassword(e.target.value)
                                    }
                                    type="password"
                                    placeholder="Old password"
                                  />
                                </label>
                              </Col>
                              <Col lg={7}>
                                <label className="profile-input">
                                  <input
                                    value={new_password}
                                    onChange={(e) =>
                                      setNewPassword(e.target.value)
                                    }
                                    type="password"
                                    placeholder="New password"
                                  />
                                </label>
                              </Col>
                              <Col lg={7}>
                                <label className="profile-input">
                                  <input
                                    value={confirm_password}
                                    onChange={(e) =>
                                      setConfirmPassword(e.target.value)
                                    }
                                    type="password"
                                    placeholder="Confirm new password"
                                  />
                                  {error !== null ? <div>{error}</div> : null}
                                </label>
                              </Col>
                              <Col lg={12}>
                                <button
                                  className="btn btn-submit"
                                  type="submit"
                                >
                                  Save
                                </button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </>
  );
}

function BookingItem(props) {
  return (
    <Col sm={6}>
      <div className="most-view-item">
        <div className="single-view" id={props.booking}>
          <div className="view-img">
            {props.booking.status2 === "Booking canceled" && (
              <span
                style={{ backgroundColor: "orange" }}
                className="tour-label"
              >
                {props.booking.status2}
              </span>
            )}
            {props.booking.status2 !== "Booking canceled" && (
              <span className="tour-label">{props.booking.status2}</span>
            )}

            <img
              src={`https://etravel12.pythonanywhere.com${props.booking.tour.image}`}
              alt="etravel"
            />
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
              {props.booking.tour && props.booking.tour.name}
            </h4>
            <p className="tour-destination">
              {props.booking.tour.destination &&
                props.booking.tour.destination.name}
            </p>
            <ul className="list-detail border-bt-dot">
              <li>
                <FontAwesomeIcon className="i" icon={faCalendarDays} />
                <Moment format="YYYY/MM/DD" withTitle>
                  {props.booking.tour && props.booking.tour.time_start}
                </Moment>
              </li>
              <li>
                <i className="fa fa-clock-o"></i>{" "}
                {props.booking.tour && props.booking.tour.duration}
              </li>
            </ul>
            <div className="tour-price">
              <h2>
                <NumericFormat
                  value={props.booking.get_total}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                />{" "}
                <small>₫</small>
              </h2>
              {props.booking.status2 !== "Booking canceled" && (
              <button className="cancel-btn" onClick={props.openModal_confirm}>Cancel tour</button>
            )}
              
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
}

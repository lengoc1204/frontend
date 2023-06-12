import Banner from "../Components/Banner";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faPlaneArrival,
  faCalendarCheck,
  faTags
} from "@fortawesome/free-solid-svg-icons";
import Apis, { endpoints } from "../Apis";
import MostViewSilder from "../Components/MostViewSilder";
export default function Home() {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  //search keyword
  const [time_to, setTime_to] = useState(null);
  const [time_from, setTime_from] = useState(null);

  const [price, setPrice] = useState(null);
  const [duration, setDuration] = useState(null);
  const [departure, setDeparture] = useState([]);
  const [destination, setDestination] = useState([]);
  const [departure_kw, setDepartureKW] = useState(null);
  const [destination_kw, setDestinationKW] = useState(null);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    let query = location.search;

    if (query === "") query = `?page=${page}`;
    setLoading(true);
    Apis.get(`${endpoints["tour"]}${query}`)
      .then((res) => {
        setLoading(false);
        setTour(res.data.results);
        console.log("tour", res.data);
        setNext(res.data.next);
        setPrev(res.data.previous);
        setCount(res.data.count);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });

    handleFetchDeparture();
    handleFetchDestination();
  }, [page, next, prev]);

  const handleFetchDestination = async () => {
    let res_departure = await Apis.get(endpoints["departure"]);
    setDeparture(res_departure.data);
    console.log("des", res_departure);
  };
  const handleFetchDeparture = async () => {
    let res_destination = await Apis.get(endpoints["destination"]);
    setDestination(res_destination.data);
    console.log(res_destination);
  };

  const onchange_search_departure = (e) => {
    var a = e.target.options[e.target.selectedIndex].getAttribute("value");
    setDepartureKW(a);
  };
  const onchange_search_destination = (e) => {
    var a = e.target.options[e.target.selectedIndex].getAttribute("value");
    setDestinationKW(a);
  };
  const onchange_price = (e) => {
    var a = e.target.options[e.target.selectedIndex].getAttribute("value");
    setPrice(a);
  };
  const search = (e) => {
    e.preventDefault();
    let path = "";
    let a = [];
    a.push(departure, destination, time_from, time_to, price);

    for (let i = 0; i <= a.length; i++) {
      if (i === 0) {
        if (a[i] !== null) {
          if (path !== null && path !== "") {
            path += `&departure=${departure_kw}`;
          } else {
            path += `?departure=${departure_kw}`;
          }
        } else {
          console.log("abc");
        }
      }
      if (i === 1) {
        if (a[i] !== null) {
          if (path !== null && path !== "") {
            path += `&destination=${destination_kw}`;
          } else {
            path += `?destination=${destination_kw}`;
          }
        } else {
          console.log("abc");
        }
      }
      if (i === 2) {
        if (a[i] !== null) {
          if (path !== null && path !== "") {
            path += `&time_from=${time_from}`;
          } else {
            path += `?time_from=${time_from}`;
          }
        } else {
          console.log("abc");
        }
      }
      if (i === 3) {
        if (a[i] !== null) {
          if (path !== null && path !== "") {
            path += `&time_to=${time_to}`;
          } else {
            path += `?time_to=${time_to}`;
          }
        } else {
          console.log("abc");
        }
      }
      if (i === 4) {
        if (a[i] !== null) {
          if (path !== null && path !== "") {
            path += `&price=${price}`;
          } else {
            path += `?price=${price}`;
          }
        } else {
          console.log("abc");
        }
      }
      navigate(`/search/${path}`);
    }
  };

  return (
    <div>
      <div className="banner-area">
        <Banner />
      </div>

      <div className="search-area">
        <div className="container">
          <div className="search-main">
            <form onSubmit={search}>
              <Row>
                <Col lg={2} md={4}>
                  <div className="search-wrap">
                    <div className="search-label">
                    <FontAwesomeIcon className="i" icon={faPlaneDeparture} />{" "} Departure
                    </div>
                    <div className="select-time">
                      <select onChange={onchange_search_departure}>
                        <option value="" key="">
                          --Departure--
                        </option>
                        {departure.results?.map((u, index) => (
                          <option value={u.id} key={index}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Col>
                <Col lg={2} md={4}>
                  <div className="search-wrap">
                    <div className="search-label">
                    <FontAwesomeIcon className="i" icon={faPlaneArrival} />{" "} Destination
                    </div>
                    <div className="select-time">
                      <select onChange={onchange_search_destination}>
                        <option value="" key="">
                          --Destination--
                        </option>
                        {destination.results?.map((u, index) => (
                          <option value={u.id} key={index}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Col>
                <Col className="date" lg={{ span: 4}} md={8}>
                  <div className="search-wrap">
                    <div className="search-label">
                    <FontAwesomeIcon className="i" icon={faCalendarCheck} />{" "} Time from
                    </div>
                    <div className="form-date">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={time_from}
                        onChange={(event) => setTime_from(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="search-wrap">
                    <div className="search-label">
                    <FontAwesomeIcon className="i" icon={faCalendarCheck} />{" "} Time to
                    </div>
                    <div className="form-date">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={time_to}
                        onChange={(event) => setTime_to(event.target.value)}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={{ span: 2}} md={4}>
                  <div className="search-wrap">
                    <div className="search-label">
                    <FontAwesomeIcon className="i" icon={faTags} />{" "} Price
                    </div>
                    <div class="select-wrap">
                      <select
                        className="select-search"
                        onChange={onchange_price}
                      >
                        <option value="">Please Select Price</option>
                        <option value="500000"> &lt;&#61; 500000</option>
                        <option value="1000000">&lt;&#61; 1000000</option>
                        <option value="2000000">&lt;&#61; 2000000</option>
                        <option value="3000000">&lt;&#61; 3000000</option>
                      </select>
                    </div>
                  </div>
                </Col>
                <Col lg={{ span: 2}} md={4}>
                  <button type="submit" className="btn-search">
                    Search
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </div>

      <div className="intro-area pd-top-112">
        <div className="container">
          <Row>
            <Col md={4}>
              <div
                className="single-intro wow  fadeInUp animated"
                data-wow-duration="0.6s"
                data-wow-delay="0.1s"
                style={{
                  visibility: "visible",
                  animationDuration: "0.6s",
                  animationDelay: "0.1s",
                  animationName: "fadeInUp",
                }}
              >
                <h4 className="intro-title">
                  <span className="intro-count">01</span>
                  <a className="intro-cat" href="#/about">
                    Travel
                  </a>
                </h4>
                <p>
                  Sponsorships are like unicorns or leprechauns, talked about
                  often but they don’t actually exist. There is only dollars and
                  cents, the ...
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div
                className="single-intro wow  fadeInUp animated"
                data-wow-duration="0.6s"
                data-wow-delay="0.1s"
                style={{
                  visibility: "visible",
                  animationDuration: "0.6s",
                  animationDelay: "0.1s",
                  animationName: "fadeInUp",
                }}
              >
                <h4 className="intro-title">
                  <span className="intro-count">02</span>
                  <a className="intro-cat" href="#/about">
                    Travel
                  </a>
                </h4>
                <p>
                  Sponsorships are like unicorns or leprechauns, talked about
                  often but they don’t actually exist. There is only dollars and
                  cents, the ...
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div
                className="single-intro wow  fadeInUp animated"
                data-wow-duration="0.6s"
                data-wow-delay="0.1s"
                style={{
                  visibility: "visible",
                  animationDuration: "0.6s",
                  animationDelay: "0.1s",
                  animationName: "fadeInUp",
                }}
              >
                <h4 className="intro-title">
                  <span className="intro-count">03</span>
                  <a className="intro-cat" href="#/about">
                    Travel
                  </a>
                </h4>
                <p>
                  Sponsorships are like unicorns or leprechauns, talked about
                  often but they don’t actually exist. There is only dollars and
                  cents, the ...
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="offer-area pd-top-70">
        <Row className="justify-content-center">
          <Col lg={8} xl={6}>
            <div className="section-title text-center">
              <h2 className="title">Special offers &amp; Discounts</h2>
              <p>
                Lorem Ipsum is simply dummy text the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,
              </p>
            </div>
          </Col>
          <div className="discount-list-slider">
            <div className="container">
            <Row>
              <Col
                className="align-self-center"
                xl="3"
                lg={{ span: 4 }}
              >
                <div
                >
                </div>
              </Col>
              <Col xl="9" lg={{ span: 8 }}>
                <MostViewSilder />
              </Col>
            </Row></div>
          </div>
        </Row>
      </div>
    </div>
  );
}

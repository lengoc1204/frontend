import { Row, Col, Container } from "react-bootstrap";
import loginImage from "../images/lg.jpg";
import { useEffect, useState } from "react";
import Apis, { endpoints } from "../Apis";
import "moment-timezone";
import { Pagination, CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import Moment from "react-moment";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

export default function TourList() {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);

  const location = useLocation();

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
  }, [page, next, prev]);
  console.log(page);
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
                  <div className="tour-list-search">
                    <div className="single-search-input-title">
                      <i className="fa fa-dot-circle-o"></i> Where From?
                    </div>
                    <div className="single-search-input">
                      <input
                        type="text"
                        placeholder="Tour List Destination"
                        fdprocessedid="gqtdbp"
                      />
                    </div>
                  </div>
                  <div className="tour-list-search">
                    <div className="single-search-input-title">
                      <i className="fa fa-dot-circle-o"></i> Where From?
                    </div>
                    <div className="single-search-input">
                      <input
                        type="text"
                        placeholder="Tour List Destination"
                        fdprocessedid="gqtdbp"
                      />
                    </div>
                  </div>
                  <div className="tour-list-search">
                    <div className="single-search-input-title">
                      <i className="fa fa-dot-circle-o"></i> Where From?
                    </div>
                    <div className="single-search-input">
                      <input
                        type="text"
                        placeholder="Tour List Destination"
                        fdprocessedid="gqtdbp"
                      />
                    </div>
                  </div>
                  <div className="tour-list-search">
                    <div className="single-search-input-title">
                      <i className="fa fa-dot-circle-o"></i> Where From?
                    </div>
                    <div className="single-search-input">
                      <input
                        type="text"
                        placeholder="Tour List Destination"
                        fdprocessedid="gqtdbp"
                      />
                    </div>
                  </div>
                  <div className="tour-list-search">
                    <div className="single-search-input-title">
                      <i className="fa fa-dot-circle-o"></i> Where From?
                    </div>
                    <div className="single-search-input">
                      <input
                        type="text"
                        placeholder="Tour List Destination"
                        fdprocessedid="gqtdbp"
                      />
                    </div>
                  </div>
                </div>
                <h2>search</h2>
                <h2>search</h2>
                <h2>search</h2>
                <h2>search</h2>
              </div>
            </Col>
            <Col xl="9" lg={{ span: 8, order: 12 }}>
              {loading && <CircularProgress style={{ left: "50%" }} />}
              <div className="tour-list-area">
                {tour.map((l) => (
                  <SingleTour obj={l} />
                ))}

                <div className="d-flex justify-content-center mt-5">
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      className="pagination-tour"
                      count={Math.ceil(count / 20)}
                      onChange={(event, value) => setPage(value)}
                      page={page}
                      style={{ outline: "none", border: "none" }}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
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

  let path = `/tour/${props.obj.id}/`;

  return (
    <Link to={path}>
      <div className="item">
        <div className="tour-img">
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

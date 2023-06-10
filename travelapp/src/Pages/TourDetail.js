import { useEffect, useState } from "react";
import {
  Badge,
  Col,
  Row,
  Spinner,
  Image,
  Form,
  Button,
  Container,
} from "react-bootstrap";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Apis, { endpoints } from "../Apis";
import loginImage from "../images/lg.jpg";
import "./tour-detail.css";
export default function TourDetail() {
  const [tour, setTour] = useState([null]);

  let { tourId } = useParams();

  useEffect(() => {
    let loadTourDetail = async () => {
      try {
        let res = await Apis.get(endpoints["tour-detail"](tourId));
        setTour(res.data);
        console.log("detail", res.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTourDetail();
  }, []);
  return (
    
    <div>
      <div
        style={{ backgroundImage: `url(${loginImage})`, height: "600px" }}
        className="tour-list-breadcrumb-area"
      ></div>
      <div className="tour-details-area">
        <div className="tour-details">
          <div style={{paddingLeft: '30px', paddingRight: '30px'}}>
            <div>
              <Row md={2} className="tour-detail-img">
                <Col sm={8} className="tour-img">
                  <img src={tour.image} />
                </Col>
                <Col sm={4} className="tour-img-detail">
                  <h3>hihihih</h3>
                  
                </Col>
              </Row>
            </div>
            <div className="second-line">
              <Row>
                <Col xl="4" lg="4" className="rating-side">
                  <h2>Rating tour</h2>
                </Col>
                <Col xl={8} lg={8}>
                  <div className="tour-name">
                    <h3>{tour.name}</h3>
                    <ul className="tour-info">
                      <li>{tour.get_final_price}</li>
                      <li>{tour.duration}</li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </div>
            <div>
                <p>{}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

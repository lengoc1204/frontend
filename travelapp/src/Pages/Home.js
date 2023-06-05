import Banner from "../Components/Banner";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationDot, faPlaneDeparture, faTags, faMagnifyingGlassLocation, faCalendarDays, faArrowUp19} from '@fortawesome/free-solid-svg-icons';
import MostView from "../Components/MostView";
import MostViewSilder from "../Components/MostViewSilder";

export default function Home(){
    return(
        <div>
            <div className="banner-area">
                <Banner />
            </div>
            
            <div className="search-area">
               <div className="container">
                    <div className="tp-main-search">
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="tp-search-single-wrap">
                                    <input className="w-100" type="text" placeholder="Destination?" fdprocessedid="slyxp" />
                                    <FontAwesomeIcon className="i" icon={faLocationDot} />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                                <div className="tp-search-single-wrap">
                                    <input className="w-100" type="text" placeholder="Departure?" fdprocessedid="slyxp" />
                                    <FontAwesomeIcon className="i" icon={faPlaneDeparture} />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-8 order-lg-6">
                                <div className="tp-search-single-wrap float-left">
                                    <div className="tp-search-date tp-departing-date-wrap w-50 float-left">
                                        <input type="text" className="departing-date hasDatepicker" placeholder="Departing Date" id="dp1685884680309" fdprocessedid="6c8cxs" />
                                        <FontAwesomeIcon className="i" icon={faCalendarDays} />
                                    </div>
                                    <div className="tp-search-date tp-returning-date-wrap w-50 float-left">
                                        <input type="text" className="returning-date hasDatepicker" placeholder="Duration" id="dp1685884680310" fdprocessedid="n1jyq" />
                                        <FontAwesomeIcon className="i" icon={faArrowUp19} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                                <div className="tp-search-single-wrap">
                                    <input className="w-100" type="text" placeholder="Price?" fdprocessedid="slyxp" />
                                    <FontAwesomeIcon className="i" icon={faTags} />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 order-12">

                                <Button className="btn btn-search" >
                                    <FontAwesomeIcon className="i" icon={faMagnifyingGlassLocation} />Search
                                </Button>
                            </div>
                        </div>
                    </div>
               </div>

            </div>
            <div className="intro-area pd-top-112">
                <div className="container">
                    <Row>
                        <Col md={4}>
                            <div className="single-intro wow  fadeInUp animated" data-wow-duration="0.6s" data-wow-delay="0.1s" 
                                style={{visibility: "visible",
                                animationDuration: "0.6s",
                                animationDelay: "0.1s",
                                animationName: "fadeInUp"}}>
                                <h4 className="intro-title">
                                    <span className="intro-count">01</span>
                                    <a className="intro-cat" href="#/about">Travel</a>
                                </h4>
                                <p>Sponsorships are like unicorns or leprechauns, talked about often but they don’t actually exist. There is only dollars and cents, the ...</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="single-intro wow  fadeInUp animated" data-wow-duration="0.6s" data-wow-delay="0.1s" 
                                style={{visibility: "visible",
                                animationDuration: "0.6s",
                                animationDelay: "0.1s",
                                animationName: "fadeInUp"}}>
                                <h4 className="intro-title">
                                    <span className="intro-count">02</span>
                                    <a className="intro-cat" href="#/about">Travel</a>
                                </h4>
                                <p>Sponsorships are like unicorns or leprechauns, talked about often but they don’t actually exist. There is only dollars and cents, the ...</p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="single-intro wow  fadeInUp animated" data-wow-duration="0.6s" data-wow-delay="0.1s" 
                                style={{visibility: "visible",
                                animationDuration: "0.6s",
                                animationDelay: "0.1s",
                                animationName: "fadeInUp"}}>
                                <h4 className="intro-title">
                                    <span className="intro-count">03</span>
                                    <a className="intro-cat" href="#/about">Travel</a>
                                </h4>
                                <p>Sponsorships are like unicorns or leprechauns, talked about often but they don’t actually exist. There is only dollars and cents, the ...</p>
                            </div>
                        </Col>
                        
                    </Row>
                </div>
            </div>
            <div className="offer-area pd-top-70">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} xl={6}>
                            <div className="section-title text-center">
                                <h2 className="title">Special offers &amp; Discounts</h2>
                                <p>
                                Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                </p>
                            </div>
                        </Col>
                        <div className="discount-list-slider">
                            <Container>
                                <Row>
                                    <Col xl={9} lg={10}>
                                        <MostViewSilder />
                                    </Col>
                                </Row>

                            </Container>
                        </div>
                    </Row> 
                    </Container>
            </div>
        </div>
        
    )
}
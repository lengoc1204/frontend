import Banner from "../Components/Banner";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useEffect , useState} from "react";
import { useLocation, useNavigate, useParams, useHistory } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLocationDot, faPlaneDeparture, faTags, faMagnifyingGlassLocation, faCalendarDays, faArrowUp19, faPlaneUp} from '@fortawesome/free-solid-svg-icons';
import Apis, {endpoints} from "../Apis";
import MostViewSilder from "../Components/MostViewSilder";
import { Pagination } from '@mui/material';

export default function Home(){
    const [tour , setTour] = useState([]);
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
    //search keyword
    const [time_to , setTime_to] = useState(null)
    const [time_from , setTime_from] = useState(null)

    const [price, setPrice] = useState(null);
    const [duration , setDuration] = useState(null);
    const [departure , setDeparture] = useState([]);
    const [destination , setDestination] = useState([]);
    const [departure_kw , setDepartureKW] = useState(null);
    const [destination_kw , setDestinationKW] = useState(null);


    const location = useLocation();

    const history = useNavigate();


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

    const handleFetchDestination= async()=>{
        let res_departure = await Apis.get(endpoints['departure'])
        setDeparture(res_departure.data)
        console.log("des", res_departure)
    }
    const handleFetchDeparture=async()=>{
        let res_destination = await Apis.get(endpoints['destination'])
        setDestination(res_destination.data)
        console.log(res_destination)
    }

    const search = (e)=>{
        e.preventDefault();

        var a = []
        var path = ''

        a.push(destination,departure,time_from,time_to,price)
        for ( let  i = 0 ; i <= a.length ; i ++) {
            if (i == 0 ){
                if (a[i] !== null){
                    if (path !== null && path !== ''){
                        path  +=  `&departure=${departure}`
                    }
                    else{
                        path  +=  `?departure=${departure}`
                    }
                }else{
                    console.log('abc')
                }
            }
            if (i == 1 ){
                if (a[i] !== null){
                    if (path !== null && path !== ''){
                        path  +=  `&destination=${destination}`
                    }
                    else{
                        path  +=  `?destination=${destination}`
                    }
                }else{
                    console.log('abc')
                }
            }
            if (i == 2) {
                if (a[i] !== null){
                    if (path !== null && path !== ''){
                        path += `&time_from=${time_from}`
                    }else{
                        path += `?time_from=${time_from}`
                    }
                }else{
                    console.log('abc')
                }
            }
            if (i == 3) {
                if (a[i] !== null){
                    if (path !== null && path !== ''){
                        path += `&time_to=${time_to}`
                    }else{
                        path += `?time_to=${time_to}`
                    }
                }else{
                    console.log('abc')
                }
            }
            if (i == 4) {
                if (a[i] !== null){
                    if (path !== null && path !== ''){
                        path += `&price=${price}`
                    }else{
                        path += `?price=${price}`
                    }
                }else{
                    console.log('abc')
                }
            }
            if (i == 5) {
                if (a[i] !== null){
                    if (path !== null && path !== ''){
                        path += `&duration=${duration}`
                    }else{
                        path += `?duration=${duration}`
                    }
                }else{
                    console.log('abc')
                }
            }
        }
        history.push(`/search/${path}`)
      


    }
    const onchange_search_departure= (e)=>{
        setDepartureKW = e.target.value
    }
    const onchange_search_destination = (e)=>{
        var a = e.target.options[e.target.selectedIndex].getAttribute("value") 
    }

    const onchange_search_price = (e)=>{
        var a = e.target.options[e.target.selectedIndex].getAttribute("value") 
    }

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
                                        <select onChange={e=>setDepartureKW(e.target.value)}>
                                            <option><FontAwesomeIcon className="i" icon={faPlaneDeparture} /></option>
                                            {departure.results?.map((u,index)=> <option value={u.id} key={index}>{u.name}</option>)}
                                        </select>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4">
                            <div className="tp-search-single-wrap">
                                        <select onChange={e=>setDepartureKW(e.target.value)}>
                                            <option><FontAwesomeIcon className="i" icon={faPlaneUp} /></option>
                                            {destination.results?.map((u,index)=> <option value={u.id} key={index}>{u.name}</option>)}
                                        </select>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-8 order-lg-6">
                                <div className="tp-search-single-wrap float-left">
                                    <div data-provide="datepicker" className="tp-search-date tp-departing-date-wrap w-50 float-left">
                                        <input type="text" className="departing-date hasDatepicker" placeholder="Departing Date" data-provide="datepicker" />
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
                                <Row>
                                    <Col className="align-self-center" xl="3" lg={{ span: 4, order: 12 }}>
                                        <div style={{textAlign: 'center', paddingLeft: '30px', color: "white"}}>
                                            <h3>Intro</h3>
                                        </div>
                                    </Col>
                                    <Col  xl="9" lg={{ span: 8, order: 12 }}>
                                        <MostViewSilder />
                                    </Col>
                                    
                                </Row>

                        </div>
                    </Row> 
            </div>
        </div>
        
    )
}
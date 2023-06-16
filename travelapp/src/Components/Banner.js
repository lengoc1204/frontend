import Carousel from 'react-material-ui-carousel';
import React, { useState } from 'react';
import Apis, {endpoints} from '../Apis';
import { connect } from "react-redux";
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';

export default function Banner(){
    const [banner, setBanner] = useState([]);
    const [loading, setLoading]=useState(false)

    useEffect(()=>{
        setLoading(true);
        Apis.get(`${endpoints["banner"]}`)
      .then((res) => {
        setLoading(false);
        setBanner(res.data);
      })
      .catch((err) => {
        setLoading(false);
      });
    }, [])
    
    return (
           <Carousel>
            {
                banner.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel> 
        
    )
}


function Item(props)
{
    return (
        <div className='banner' style={{height: '80vh', background: 'white'}}>
            
            <img src={props.item.image} />
        </div>
    )
}
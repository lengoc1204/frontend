import Carousel from 'react-material-ui-carousel';
import { bannerURL } from '../contants';
import React, { useState } from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';

export default function Banner(){
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]
    
    return (
           <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel> 
        
    )
}


function Item(props)
{
    return (
        <div style={{height: '80vh', background: 'lightGrey'}}>
            
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </div>
    )
}
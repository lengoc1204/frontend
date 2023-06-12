import "./search.css";
import { useEffect, useState } from "react";
import Apis, {endpoints} from "../Apis";
export default function SearchBar(){
    const [departure, setDeparture] = useState([]);
  const [destination, setDestination] = useState([]);
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
  useEffect(()=>{
    handleFetchDeparture();
    handleFetchDestination();
  })
    return(
        <>
        <div className='container'>
            <label>Departure</label>
        <select className="selectpicker" data-show-subtext="true" data-live-search="true">
        <option value="" key="">--Point Of Departure--</option>
                                {departure.results.map((u,index)=> <option value={u.id} key={index}>{u.name}</option>)}
      </select>

        </div>
        </>
    )
}
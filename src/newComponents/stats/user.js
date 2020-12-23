import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './userCard.component'
import Legends from './legends'
import Navbar from '../Navbar/navbar.component'
import Sidebar from './userSidebar'

function User(props){
const apiKey = process.env.REACT_APP_API_KEY;
let brawlid = props.match.params.id
//data is set to nested objects that will hold our api data hits
const [data, setData] = useState({
    userData: {},
    rankedData: {},
})
useEffect(()=>{
    //fetch data from api
    axios.all([
    axios.get(`https://api.brawlhalla.com/player/${brawlid}/stats?api_key=${apiKey}`),
    axios.get(`https://api.brawlhalla.com/player/${brawlid}/ranked?api_key=${apiKey}`)
          ])
          .then(response => { //sets each get request to an object in an array
            setData({userData: response[0].data, rankedData: response[1].data}) // sets the responses from calls to data objects
                            });
            },[brawlid])//only run useEffect if brawlid params have changed
  //check if data has been loaded          
if (!data){
    return(<h1>Loading</h1>)
}else{  
    //return user ranked card info and then legends
return(<div>  
        <Navbar />
        <Sidebar />
        <UserCard 
        userData = {data.userData}
        rankedData = {data.rankedData}
        />
        <Legends legends={data.userData.legends}/>       
     </div> 
    )}
}

export default User;

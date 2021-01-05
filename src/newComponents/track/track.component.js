import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/navbar.component'
import UserTable from './children/userTable'
import { TwitterPicker } from 'react-color';
import ms from 'ms'
import './track.css'
import { propTypes } from 'react-bootstrap/esm/Image';


function Track(props){
 const apiKey = process.env.REACT_APP_API_KEY;
 const bh = require('brawlhalla-api')(apiKey);
 const [user, setUser] = useState({})
 const [user2, setUser2] = useState({})
 const [username, setUsername] = useState()
 const [userLoaded, setLoaded] = useState(false)
 const [initWins, setInitWins] = useState()
 const [currentLosses, setCurrentLosses] = useState(0)
 const [background, setBackground] = useState('#9a02ff')
 
//hhere this works well, the only issue is having to wait for the first interval to show username and init stats
const handleChangeComplete = (color) => {
  setBackground(color.hex);
};

 useEffect(()=>{
if(props.location.state === undefined){
let id = props.match.params.id
bh.getPlayerRanked(id).then(function(playerRanked){
  console.log(playerRanked.wins)
  
  })
  setInterval(()=>{
  },ms('10m'))



  }
    else{
let initUser = props.location.state.user
setUsername(props.location.state.user.username)
setInterval(()=>{
  bh.getPlayerRanked(initUser.brawlid).then(function(playerRanked){
    console.log(playerRanked)
    setUser(
      
      {
        username: playerRanked.name,
        wins: (playerRanked.wins - initUser.initWins),
        games: (playerRanked.games - initUser.initGames),
        rating: (playerRanked.rating),
        netRating: (playerRanked.rating - initUser.initRating),
        get losses(){
          return(this.games - this.wins);
        }

      }
      
    )
    setLoaded(true)
    })},ms('1m'))
    }
 },[props])


 if(props.location.state === undefined){
  return(
    <div>
    <Navbar/>
    <p>Work in progress</p>
    <p>Please go to the track page and enter your id there to track stats</p>
  </div>)
 }
 else{
   return(
    <div>
    <Navbar/>
    <p>Stats will begin tracking in 1 minute!</p>
    <p>Use the color picker below to customize your tracker!</p>
    <TwitterPicker 
    color={background}
    onChangeComplete={handleChangeComplete}
    />
    <UserTable header={background} user={user} name={username}/>
  </div>
   )
 }
}

export default Track;
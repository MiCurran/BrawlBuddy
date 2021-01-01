import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/navbar.component'
import { useForm } from "react-hook-form";
import './track.css'
import { Redirect } from 'react-router-dom';

export default function TrackSearch() {
    const apiKey = process.env.REACT_APP_API_KEY;
 const bh = require('brawlhalla-api')(apiKey);
 const [user, setUser] = useState({})
 const [userLoaded, setLoaded] = useState(false)
 const { register, handleSubmit } = useForm();
 const onSubmit = (data, e) => {
    bh.getPlayerRanked(data.brawlid).then(function(playerRanked){
      console.log(playerRanked)
      setUser(
        
        {
          username: playerRanked.name,
          brawlid: playerRanked.brawlhalla_id.toString(),
          initWins: playerRanked.wins,
          wins: playerRanked.wins,
          initGames: playerRanked.games,
          games: playerRanked.games,
          initRating: playerRanked.rating,
          rating: playerRanked.rating,
          initLosses: (playerRanked.games - playerRanked.wins)
        }
        
      )
      setLoaded(true)
      }).catch(function(error){
      
        })};
  const onError = (errors, e) => console.log(errors, e);
if(userLoaded === false){
    return(<div>
        <Navbar />
        <p>track search</p>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
<input placeholder="brawlhalla id" name="brawlid" ref={register} />
<button className="btn btn-primary" type="submit">Submit</button>
</form>

    </div>)
    }
    else{
        return(<Redirect to={{pathname: `/track/${user.brawlid}`, state: { user: user }}} />)
    }
}
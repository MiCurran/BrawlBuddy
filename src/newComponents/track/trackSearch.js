import React, { useState } from 'react';
import Navbar from '../Navbar/navbar.component'
import { useForm } from "react-hook-form";
import FAQ from './children/faq.component'
import './track.css'
import TrackButton from './trackButton.component/trackButton.component'
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
        <div class="content">
          <h1 className="mb-0">Enter a Brawlhalla ID to Start Tracking</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
<input placeholder="brawlhalla id" name="brawlid" ref={register} />
<TrackButton className="btn btn-primary" type="submit" label="Start Tracking"/>
</form>
          <div className="faq-container">
<h2>F.A.Q's</h2>
      <FAQ />
          </div>
        </div>
        

    </div>)
    }
    else{
        return(<Redirect to={{pathname: `/track/${user.brawlid}`, state: { user: user }}} />)
    }
}
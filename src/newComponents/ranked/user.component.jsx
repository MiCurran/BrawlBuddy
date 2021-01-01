import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route,  Switch,Link} from 'react-router-dom';


function User(props){
    const userName = props.user.name
    const rank = props.user.rank
    const brawlhalla_id = props.user.brawlhalla_id
    const teamname = props.user.teamname
    const wins = props.user.wins
    const games = props.user.games
    const rating = props.user.rating
    const peak_rating = props.user.peak_rating
    const region = props.user.region

    return(
        <div className="rankedTable" key={rank || teamname}>
        <div className="left">
        <div className="col-2 rank-col data"><strong>{rank}</strong></div>
        <div className="col-2 data nameCol"><Link to={{pathname:`/stats/${brawlhalla_id}`}}>{teamname || userName.substring(0,15)}</Link></div>
        </div>
        <div className="right">
        <div className="col-2 data eloTier region">{region}</div>
        <div className="col-2 data eloTier"><img src={`${process.env.PUBLIC_URL}/RankedBanner${props.user.tier}.png`} alt={props.user.tier}></img></div>
        <div className="col-2 data eloTier">{rating}</div>
        <div className="col-2 data eloTier">{peak_rating}</div>
    <div className="col-2 data eloTier">{((wins / games) * 100).toFixed(0) + '%'}</div>
    </div>
      </div>
      
    )
}

export default User;
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

    return(
        <div className="row  rank-row data" key={rank || teamname}>
        <div className="col-2 rank-col data"><strong>{rank}</strong></div>
        <div className="col-2 data"><Link to={{pathname:`/test/${brawlhalla_id}`}}>{teamname || userName.substring(0,15)}</Link></div>
        {/* <div className="col-2 data">{props.user.tier}</div> */}
        <div className="col-2 data">{rating}</div>
        <div className="col-2 data">{peak_rating}</div>
    <div className="col-2 data">{((wins / games) * 100).toFixed(0) + '%'}</div>
      </div>
    )
}

export default User;
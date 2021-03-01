import React from 'react';
import {Link} from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'

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
        <Row key={rank || teamname} className="pt-2 userRow">
        <Col xs={1} ><strong>{rank}</strong></Col>
        <Col ><Link to={{pathname:`/stats/${brawlhalla_id}`}}>{teamname || userName.substring(0,10)}</Link></Col>
        <Col>{region}</Col>
        <Col className="data eloTier"><img src={`${process.env.PUBLIC_URL}/RankedBanner${props.user.tier}.png`} alt={props.user.tier}></img></Col>
        <Col >{rating}</Col>
        <Col >{peak_rating}</Col>
    <Col>{((wins / games) * 100).toFixed(0) + '%'}</Col>
      </Row>
      
    )
}

export default User;
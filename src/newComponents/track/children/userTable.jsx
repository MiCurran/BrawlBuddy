import React, { useState, useEffect } from 'react';

export default function 
UserTable(props){
  const username= props.name
  const games = props.user.games 
  const wins = props.user.wins
  const rating = props.user.rating
  const netRating = props.user.netRating 
  const losses = props.user.losses

return(
    <div className="trackTable-container">
      <div className="trackTable">
      <div className="trackTable-header" style={{backgroundColor: props.header}}>
      <p>username </p>
        <p>games </p>
        <p>w-l </p>
        <p>elo </p>
        <p>net elo </p>

      </div>
      <div className="data-row">
        <div className="data-col name"><p> {username}</p></div>
        <div className="data-col game"><p> {games}</p></div>
        <div className="data-col"><p> {wins}-{losses}</p></div>
        <div className="data-col"><p> {rating}</p></div>
        <div className="data-col last"><p> {netRating}</p></div>
        </div>
        </div>
    </div>
)
}
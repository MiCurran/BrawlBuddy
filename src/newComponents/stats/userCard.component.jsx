import React, { useState, useEffect } from 'react';
import Chart from './pieChart'
import './userCard.css' 

function UserCard(props){
    // -user card component displays ranked stats for the user
    // -we want to display their current season ranked stats with a pie chart for w/l and a banner for ranked tier
    const userName = props.userData.name
    const lvl = props.userData.level
    const xp_percentage = (props.userData.xp_percentage * 100)
    const wins = props.rankedData.wins
    const games = props.rankedData.games
    const tier = props.rankedData.tier
    return(
        <div className="row my-3 rank-row d-flex justify-content-center text-center " key={userName}>
        <div className="userContainer">

            <div className='info-column'>
                <div className='user-info'>
                  <div className="col-12 text-dark userName">{userName}</div>
                  <div className="col-12 text-dark">Account level: {lvl}</div>
                  <progress id="level" value={xp_percentage} max="100"></progress>
                  </div>
                  <div className="stats">
                  <div className="col-12 text-dark">
                      <p>Win Rate: {((wins / games) * 100).toFixed(0) + '%'}</p>
                      <p>Games: { games}</p>
                      <p>Wins: { wins}</p>
                      <p>Losses: {(games - wins)}</p>
                      </div>
                      </div>
                      </div>

                      <div className="visual-column">
                        <Chart wins={wins} games={games}/>
                      <div className="ranked-banner"> 
                        <img src={`${process.env.PUBLIC_URL}/RankedBanner${tier}.png`} alt={`ranked banner ${tier}`}></img>
                    </div>
                      </div>
                  
                  </div>
                  </div>
    )
}

export default UserCard;
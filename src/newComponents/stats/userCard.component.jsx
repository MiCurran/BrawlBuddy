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
        <div className="row py-5 rank-row d-flex justify-content-center text-center " key={userName}>
          <h1 className="season">Season 19 Stats</h1>
        <div className="userContainer">

            <div className='info-column'>
                <div className='user-info'>
                  <div className="col-12  userName">{userName}</div>
                  <progress id="level" value={xp_percentage} max="100"></progress>
                  <div className="col-12 ">Account level: {lvl}</div>
                  </div>
                  <div className="stats">
                  <div className="col-12">
                      <p>Win Rate: <span className="userGameCount">{((wins / games) * 100).toFixed(0) + '%'}</span></p>
                      <p>Games: <span className="userGameCount">{ games}</span></p>
                      <p>Wins: <span className="userGameCount">{ wins}</span></p>
                      <p>Losses: <span className="userGameCount">{(games - wins)}</span></p>
                      </div>
                      </div>
                      </div>

                      <div className="visual-column">
                      <div className="ranked-banner"> 
                        <img src={`${process.env.PUBLIC_URL}/RankedBanner${tier}.png`} alt={`ranked banner ${tier}`}></img>
                    </div>
                        <Chart wins={wins} games={games} style={{height: '250px'}}/>
                      </div>
                  
                  </div>
                  </div>
    )
}

export default UserCard;
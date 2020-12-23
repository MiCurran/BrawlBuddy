import React, { useState, useEffect } from 'react';
import useDataApi from 'use-data-api';
import axios from 'axios';
import Legend from './legend.component'
import Legends from './legends'
import Chart from './pieChart'

function User(props){
const apiKey = process.env.REACT_APP_API_KEY;
let brawlid = props.match.params.id
const [{data, isLoading, isError }, doFetch] = useDataApi(
        `https://api.brawlhalla.com/player/${brawlid}/stats?api_key=${apiKey}`,
         [] ,
      );
    useEffect(()=>{
       doFetch( `https://api.brawlhalla.com/player/${brawlid}/stats?api_key=${apiKey}`
       
       )
       console.log(data)
    })
    if(!data.legends){
        return(<h1>waiting.......</h1>)
    }else{
return(<div>
{isError && <div ClassName="text-white">Something went wrong ...</div>}
{isLoading ? (
        <div>Loading ...</div>
      ) : (<div>
    <h1>This is the User Component the users brawlID is {brawlid}</h1>
    <p>{data.name}</p>
    <div className="row my-3 rank-row d-flex justify-content-center text-center " key={data.brawlhalla_id}>
        <div className="userContainer">
                  <div className="col-12 text-dark userName">{data.name}</div>
                  <div className="col-12 text-dark">Account level: {data.level}</div>
                  <progress id="level" value={data.xp_percentage} max="100"></progress>
                  <div className="col-12 text-dark">Win Rate: {((data.wins / data.games) * 100).toFixed(0) + '%'}</div>
                  {/* here we want to render the piechart component with wins and games passed as props */}
                  <div className="stats">
                  <Chart wins={data.wins} games={data.games}/>
                  <div className="col-12 text-dark">
                      <p>Win Rate: {((data.wins / data.games) * 100).toFixed(0) + '%'}</p>
                      <p>Games: { data.games}</p>
                      <p>Wins: { data.wins}</p>
                      <p>Losses: {(data.games - data.wins)}</p>

                  </div>
                    </div>
                  </div>
                  </div>
                  <Legends legends={data.legends}/>
                 
     </div> )}
    </div>
    )}
}

export default User;

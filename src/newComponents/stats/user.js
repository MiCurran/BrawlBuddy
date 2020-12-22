import React, { useState, useEffect } from 'react';
import useDataApi from 'use-data-api';
import axios from 'axios';
import Legend from './legend.component'
import Legends from './legends'
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
                  <div className="col-12 text-dark userName">{data.name}</div>
                  <div className="col-12 text-dark">Account level: {data.level}</div>
                  <progress id="level" value={data.xp_percentage} max="100"></progress>
                  <div className="col-12 text-dark">Win Rate: {((data.wins / data.games) * 100).toFixed(0) + '%'}</div>
                  <p>{brawlid}</p>
                  </div>
                  <Legends legends={data.legends}/>
                 {/* {data.legends.map((item =>{
                     return(<Legend legend={item}/>)
                 }))} */}
     </div> )}
    </div>
    )}
}

export default User;

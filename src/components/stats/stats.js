import React, {Fragment, useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import useDataApi from 'use-data-api';
import brawlidLocation from './assets/images/brawlidlocation.png'
import './stat.css'


function Stats(){
  const apiKey = process.env.REACT_APP_API_KEY;
const [brawlhalla_id, setBrawlhalla_id] = useState('')
const [name, setName] = useState('')
const [level, setLevel] = useState('')
const [wins, setWins] = useState(0)
const [games, setGames] = useState(0)
const [legends, setLegends] = useState([{legend_id: 18,legend_name_key:'test'}])
const [xp, setXp] = useState(0)
const { register, handleSubmit } = useForm();
const onSubmit = (data, e) => setBrawlhalla_id(data.brawlhalla_id, e);
const onError = (errors, e) => console.log(errors, e);
const [{data, isLoading, isError }, doFetch] = useDataApi(
        `https://api.brawlhalla.com/player/${brawlhalla_id}/stats?api_key=${apiKey}`,
         [] ,
        
      );
    
        const setNameCaps = (s) =>{
          if (typeof s !== 'string') return ''
          return s.charAt(0).toUpperCase() + s.slice(1)
        }
      
      
const updateUser = () => {
    doFetch(`https://api.brawlhalla.com/player/${brawlhalla_id}/stats?api_key=${apiKey}`)
      setName(data.name)
      setLevel(data.level)
      setWins(data.wins)
      setGames(data.games)
      setXp((data.xp_percentage * 100).toFixed(0))
      setLegends(data.legends)//need to map the legends response to this setFunction
}

      useEffect(() =>{
      updateUser()
      
    })
    if (!legends) {return( 
      <div>
        <h1>Enter a brawlID to search</h1>
      
                <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input placeholder="brawlhalla id" name="brawlhalla_id" ref={register} />
          <button type="submit">Submit</button>
        </form>
        <div className="mt-5">
          <p>Where is my BrawlID?</p>
        <img src={brawlidLocation} alt="brawl id location"></img>
        </div>
      </div>
      )}
        else{ 
          return(
            <Fragment>
              <div id="stats">
            {isError && <div ClassName="text-white">Something went wrong ...</div>}
      
            {isLoading ? (
              <div>Loading ...</div>
            ) : (<div>
                 <div className="search-container">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input placeholder="brawlhalla id" name="brawlhalla_id" ref={register} />
          <button className="btn btn-light"type="submit">Search User</button>
        </form>
            <p>Stats for {name}</p>
            </div>
                  <div className="row my-3 rank-row d-flex justify-content-center text-center " key={brawlhalla_id}>
                  <div className="col-12 text-dark userName">{name}</div>
                  <div className="col-12 text-dark">Account level: {level}</div>
                  <progress id="level" value={xp} max="100"></progress>
                  <div className="col-12 text-dark">Win Rate: {((wins / games) * 100).toFixed(0) + '%'}</div>
              
                 
             
                </div>
                <div className="row mx-5">
                  
                {legends.map(item => (
                  
                  <div className=" col-12 my-3 text-dark legendCard" key={item.legend_id}>
                  <div className="cardImg"><img src={process.env.PUBLIC_URL + `${item.legend_name_key}.png`} alt={`${item.legend_name_key}.png`}></img></div>
                <div className="col text-dark" id="legendName"><strong>{setNameCaps(item.legend_name_key)}</strong></div>
                <label htmlfor="level">{(item.xp_percentage * 100).toFixed(0)+'%'}</label>
                <progress id="level" value={(item.xp_percentage * 100).toFixed(0)} max="100"></progress>
                <div className="col text-sm">lvl {item.level}</div>


                
              </div>
                  
              
             
              
            ))}
            </div>
                
        </div>
        
            )}
            </div>
          </Fragment>
            
            );
            }
    
}

export default Stats;
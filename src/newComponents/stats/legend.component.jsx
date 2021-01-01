import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './pieChart'
var format=require('format-number');
var myFormat = format({prefix: '', suffix: ''});

function Legend(props){
  const apiKey = process.env.REACT_APP_API_KEY;
    const legendName = props.legend.legend_name_key
    const xp_percentage = props.legend.xp_percentage
    const level = props.legend.level
    const legend_id = props.legend.legend_id
    const [data, setData] = useState({
      legendData: {},
  })
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] =useState(0)
 
    useEffect(()=>{
      axios.all([
        axios.get(`https://api.brawlhalla.com/legend/${legend_id}/?api_key=${apiKey}`),
              ])
              .then(response => { //sets each get request to an object in an array
                setData({legendData: response[0].data}) // sets the responses from calls to data objects
                                });
                
     const setTime = () => {
        setHours(Math.floor(props.legend.matchtime/3600))
        setMinutes(props.legend.matchtime % 60)
      }
      setTime()
    },[props.legend.legend_name_key])
    return(<div className="legendRow">
        <div className=" col-12 my-3 text-dark legendCard" key={legend_id}>
        <div className="cardImg"><img src={`${process.env.PUBLIC_URL}/${legendName}.png`} alt={`${legendName}.png`}></img></div>
      <div className="col text-dark" id="legendName"><strong>{legendName}</strong></div>
      <label htmlFor="level">{(xp_percentage * 100).toFixed(0)+'%'}</label>
      <progress id="level" value={(xp_percentage * 100).toFixed(0)} max="100"></progress>
      <div className="col text-sm">lvl {level}</div>
    </div>
    <div className="legendStats d-flex">
    <div className="cardHeader">
        <h4>Overview</h4>
        </div>
      <div className="overview px-5">     
    <p className="legendData">Time spent in match <strong className="label">{hours} hours</strong>  and <strong className="label">{minutes} minutes</strong></p>
    <div className="legendGames d-flex justify-content-between flex-row align-items-center">
    <div>
    <p className="legendData">Games Played: <span className="gameCount">{props.legend.games}</span></p>
    <p className="legendData">Games Won: <span className="gameCount">{props.legend.wins}</span></p>
    <p className="legendData">Games Lost: <span className="gameCount">{(props.legend.games - props.legend.wins)}</span></p>
    </div>
    <Chart wins={props.legend.wins} games={props.legend.games} style={{height: '50%', width: '50%'}}/>
    </div>
    </div>
    </div>
    <div className="legendStats">
    <div className="cardHeader">
    <h4>Damage</h4>
        </div>
      <div className="damage  px-5">
      <div className="weapons d-flex flex-row justify-content-center">
      <div className="weapon1 d-flex flex-column px-2">
    <p className="weaponLabel">{data.legendData.weapon_one} damage:</p>
    <div><img src={`${process.env.PUBLIC_URL}/${data.legendData.weapon_one}icon.png`} alt="weapon1"></img></div>
    <p className="damageCount">{myFormat(props.legend.damageweaponone)}</p>
    </div>
    <div className="weapon2 d-flex flex-column px-3">
      <p className="weaponLabel">{data.legendData.weapon_two} damage:</p>
      <div><img src={`${process.env.PUBLIC_URL}/${data.legendData.weapon_two}icon.png`} alt="weapon2"></img></div>
      <p className="damageCount">{myFormat(props.legend.damageweapontwo)}</p>
    </div>
    </div>
    <div className="legendData text-left">
    <p className="legendData"><span className="label">Total</span> Damage Dealt: <span className="gameCount">{myFormat(props.legend.damagedealt)}</span></p>
      </div>
      <div className="legendData text-left">
      <p className="legendData"><span className="label">Total</span> Damage Taken: <span className="gameCount">{myFormat(props.legend.damagetaken)}</span></p>
      </div>
    </div>
    </div>
    </div>
    )
}

export default Legend;
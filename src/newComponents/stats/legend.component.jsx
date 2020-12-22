import React, { useState, useEffect } from 'react';
import useDataApi from 'use-data-api';


function Legend(props){
    const legendName = props.legend.legend_name_key
    const xp_percentage = props.legend.xp_percentage
    const level = props.legend.level
    const legend_id = props.legend.legend_id
    const apiKey = process.env.REACT_APP_API_KEY;

    useEffect(()=>{
        
    })
    return(
        <div className=" col-12 my-3 text-dark legendCard" key={legend_id}>
        <div className="cardImg"><img src={process.env.PUBLIC_URL + `${legendName}.png`} alt={`${legendName}.png`}></img></div>
      <div className="col text-dark" id="legendName"><strong>{legendName}</strong></div>
      <label htmlFor="level">{(xp_percentage * 100).toFixed(0)+'%'}</label>
      <progress id="level" value={(xp_percentage * 100).toFixed(0)} max="100"></progress>
      <div className="col text-sm">lvl {level}</div>


      
    </div>
    )
}

export default Legend;
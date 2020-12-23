import React, { useState, useEffect } from 'react';
import Legend from './legend.component'
import './legends.css'
function Legends(props){
  
  console.log(props.legends)
  if(!props.legends){
    return(
        <div>
      <p>no legends</p>
        </div>
    )}
    else{
        return(<div className="legend-container">
            {props.legends.map(legend=>{
                return(<div >
                <Legend legend={legend}/>
                </div>)
            })}
            </div>
        )
    }
}
export default Legends
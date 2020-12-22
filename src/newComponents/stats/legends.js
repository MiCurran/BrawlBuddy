import React, { useState, useEffect } from 'react';
import Legend from './legend.component'

function Legends(props){
  
  console.log(props.legends)
  if(!props.legends){
    return(
        <div>
      <p>dafsdfdasf</p>
        </div>
    )}
    else{
        return(<div>
            {props.legends.map(legend=>{
                return(<div>
                <Legend legend={legend}/>
                </div>)
            })}
            </div>
        )
    }
}
export default Legends
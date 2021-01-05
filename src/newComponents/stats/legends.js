import React, { useState, useEffect } from 'react';
import Legend from './legend.component'
import Button from 'react-bootstrap/Button'
import './legends.css'
function Legends(props){
  const [displayLegend, setDisplayLegend] = useState(false)
  const [legendData, setLegendData] = useState({})
    
   const setDisplay = ()=>{//sets the visibility of the legend component
     setDisplayLegend(!displayLegend)
       }

  if(!props.legends){//when loading we display this
    return(
        <div>
      <p>no legends</p>
        </div>
    )}
    //i think what we want to do here is render an avatar element for each legend below
    //then run an on click function that renders the full legend component when the headshot is clicked
    //after that works, id like to put it in a slideshow bar that scrolls automatically 
    //can do on hover show a tool tip with info and say click ffor more
    else{
    
        if(displayLegend === false){//if we havent chosen to display a specific legend yet we do render an image of each legend
            const legends = props.legends.slice(0,5)
            //in the future I would like to change this to a dropdown or carousel
        return(<div className="legend-container">    

<div className="topLegends justifyContent-center text-center my-2">
    <h1 className="text-white">Legend Stats</h1>
    <div className="dropdown">
  <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Choose a Legend
  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  {props.legends.map(legend=>{
                return(<div >
                    <a className="dropdown-item" onClick={()=>{setLegendData(legend);setDisplay()}}>{legend.legend_name_key}</a>
                {/* <Legend legend={legend}/> */}
                </div>)
            })}
  </div>
</div>
    <div className="d-flex flex-row my-5">
        {legends.map(legend=>{
            return(<div >
                <img id="legendimg" style={{cursor:'pointer'}} onClick={()=>{setLegendData(legend);setDisplay()}} src={`${process.env.PUBLIC_URL}/${legend.legend_name_key}.png`} alt={`${legend.legend_name_key}.png`}></img>
                </div>)
            })
         } 
         </div>
         </div>         
      </div>
        )}
        else{
            return(<div className="legends">
                <Legend legend={legendData}/>
                <div>
                <Button id="escapebtn" variant="primary" onClick={setDisplay}>X</Button>{' '}
                </div>
            </div>
               
            )
        }
    }
}
export default Legends
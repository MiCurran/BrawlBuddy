import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route,  Switch,Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import User from './user'
import Sidebar from './userSidebar'
import Navbar from '../Navbar/navbar.component'
import Ranked from '../ranked/ranked'
import './search.css'
//in stats we want to render the user stats with the brawlid as props
//need to add region, and win loss record to search result cards
function SearchComponent(props){
    var i;
    var userspassed = false
    const apiKey = process.env.REACT_APP_API_KEY;
    const bh = require('brawlhalla-api')(apiKey);
    const [userList, setUserList] = useState()
const { register, handleSubmit } = useForm();
const onSubmit = (data, e) => bh.getBhidByName(data.firstName || data.name).then(function(users){
for(i=0; i< users.length; i++){
    setUserList([
        ...users,
        {
          id: users.length,
          brawlid: users.brawlhalla_id
        }
      ])
}
}).catch(function(error){

});
const onError = (errors, e) => console.log(errors, e);
useEffect(()=>{
  if(props.location.state != undefined){
    console.log(props.location.state.users)
    for(i=0; i< props.location.state.users.length; i++){
      setUserList([
          ...props.location.state.users,
          {
            id: props.location.state.users.length,
            brawlid: props.location.state.users.brawlhalla_id
          }
        ])
  }
  }
  else{
    
  console.log(userList)
  }
},[props])
  if(!userList){//we will replace this with a little tuturial component because we want search on the sidebar
      return(
        <div>
            <Navbar/>
            <div className="sidebar">
        <div className="row">
        <h4 className="text-white label">Enter a Player Name to search</h4>
        <p className="text-white">(must be exact match)</p>
        <div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
<input placeholder="User Name" name="name" ref={register} />
<button className="btn btn-primary"type="submit">Submit</button>
</form>
        </div>
       
        </div>
        </div>
        <div className="content">
          <h1>Search</h1>
          <div className="">
        <h4 className=" label">Enter a Player Name to search</h4>
        <p className="text-white">(must be exact match)</p>
        <div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input placeholder="User Name" name="firstName" ref={register} />
      <button  className="btn btn-primary"type="submit">Search</button>
    </form>
        </div>
        <div className="">
            <img src={`${process.env.PUBLIC_URL}/DashImg1.png`} alt="ranked-banner"></img>
          </div>
        </div>
        </div>
        </div>
      )
  }else{
    //we still want to return the ooption to serch again but this time include a list of fusers we searched for with links to their stats page
    return(
        <div>
          <Navbar/>
          <div className="sidebar">
            <h4 className="text-white label">Enter a Player Name to search</h4>
      
      <form onSubmit={handleSubmit(onSubmit, onError)}>
<input placeholder="User Name" name="firstName" ref={register} />
<button className="btn btn-primary"type="submit">Submit</button>
</form>
<div className="mt-5">
</div>
        </div>
        <section className="search-results">
        <div className="results">
          <div className="page-header"> 
                     <h1 className="text-white">Search Results for "<span className="search-request">{userList[0].name}</span>"</h1>
            </div>
            <div className="page-content">
              <p className="text-white">Click any user to view detailed stats!</p>
            </div>
            <div className="results-container">
        {userList.map(item => (//need to make this test function child route render a UserStats component will have the legend components render
          <div className=" list-card" key={item.id}>
            <Link style={{color:'#fefdff'}}key={item.id} to={{pathname:`/stats/${item.brawlhalla_id}`}} brawlhalla_id={item.brawlhalla_id}>
            <div className="list-card-header shadow">
          <h4>{item.name}</h4>
          <p className="list-card-row-content">{item.region}</p>
          </div>
          </Link>
       
          <div className="list-card-row">
          <p className="list-card-row-content content-label">elo: <span className="game-count">{item.rating}</span></p>
           <p className="list-card-row-content content-label">Peak: <span className="game-count">{item.peak_rating}</span></p>
           </div>
           <div className="list-card-row">
           <p className="list-card-row-content content-label">W </p>
           <p className="list-card-row-content content-label">- </p>
           <p className="list-card-row-content content-label">L </p>

           </div>
           <div className="list-card-row win-count">
           <p className="list-card-row-content game-count">{item.wins}</p>
           <p className="list-card-row-content game-count">- </p>
           <p className="list-card-row-content game-count">{(item.games-item.wins)}</p>

           </div>
          <div className="list-ranked-banner">
            <img src={`${process.env.PUBLIC_URL}/RankedBanner${item.tier}.png`} alt="ranked-banner"></img>
          </div>
          </div>
          // each of these should be a link to the respective stat page such as stats/:brawlhalla_ID
        ))}
      </div>
            <div>
               
            </div>
            </div>
            </section>
      </div>
    )}
}

export default SearchComponent;
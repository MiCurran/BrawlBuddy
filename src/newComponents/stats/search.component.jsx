import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route,  Switch,Link} from 'react-router-dom';
import { useForm } from "react-hook-form";
import User from './user'

//in stats we want to render the user stats with the brawlid as props

function SearchComponent(){
    var i;
    const apiKey = process.env.REACT_APP_API_KEY;
    const bh = require('brawlhalla-api')(apiKey);
    const [userList, setUserList] = useState();
const { register, handleSubmit } = useForm();
const onSubmit = (data, e) => bh.getBhidByName(data.name).then(function(users){
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

});;
const onError = (errors, e) => console.log(errors, e);
  if(!userList){//we will replace this with a little tuturial component because we want search on the sidebar
      return(
        <div>
        <h1>Enter a Player Name to search</h1>
      
                <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input placeholder="brawlhalla id" name="name" ref={register} />
          <button type="submit">Submit</button>
        </form>
        <div className="mt-5">
        </div>
        </div> 
      )
  }else{
    //we still want to return the ooption to serch again but this time include a list of fusers we searched for with links to their stats page
    return(
        <div>
        <h1>Enter a Player Name to search</h1>
      
                <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input placeholder="brawlhalla id" name="name" ref={register} />
          <button type="submit">Submit</button>
        </form>
        <div className="mt-5">
        </div>
        <div>
            <p>user results</p>
            <h2>Which one are you?!</h2>
            <div className="row">
            
        {userList.map(item => (//need to make this test function child route render a UserStats component will have the legend components render
          <div className="col" key={item.id}><p>{item.name}</p><p>elo: {item.rating}</p> <p>Peak: {item.peak_rating}</p>
          <Link key={item.id} to={{pathname:`/test/${item.brawlhalla_id}`}} brawlhalla_id={item.brawlhalla_id}>{item.name}</Link>
          </div>
          // each of these should be a link to the respective stat page such as stats/:brawlhalla_ID
        ))}
      </div>
            <div>
               
            </div>
            </div>
      </div>
    )}
}

export default SearchComponent;
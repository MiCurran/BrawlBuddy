import React, { useState, useEffect } from 'react';
import './userSidebar.css'
import { useForm } from "react-hook-form";


function Sidebar(props){
    var i;
    const apiKey = process.env.REACT_APP_API_KEY;
    const bh = require('brawlhalla-api')(apiKey);
    const [userList, setUserList] = useState();
const { register, handleSubmit } = useForm();
const onError = (errors, e) => console.log(errors, e);
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

});

    return(
        //onSubmit={handleSubmit(onSubmit, onError)}ref={register}
<div className="sidebar">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input placeholder="brawlhalla id" name="name" ref={register} />
          <button type="submit">Submit</button>
        </form>
        <div className="mt-5">
        </div>
        </div>
    )
}
export default Sidebar;
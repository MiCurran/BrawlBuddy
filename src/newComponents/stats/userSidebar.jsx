import React, { useState, useEffect } from 'react';
import './userSidebar.css'

function Sidebar(props){
    return(
        //onSubmit={handleSubmit(onSubmit, onError)}ref={register}
<div className="sidebar">
          <form >
      <label className="text-white" for="firstName"><h4>Search User</h4></label>
      <input placeholder="User Name" name="firstName"  />
      <button  className="btn btn-primary"type="submit">Search</button>
    </form>
        </div>
    )
}
export default Sidebar;
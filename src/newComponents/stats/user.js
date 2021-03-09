import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard.component";
import Legends from "./legends";
import Navbar from "../Navbar/navbar.component";
import "./stat.css";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { playerAPI } from '../../constants/api/baseApi'

function User(props) {
  const apiKey = process.env.REACT_APP_API_KEY;
  let brawlid = props.match.params.id;
  const bh = require("brawlhalla-api")(apiKey);
  //data is set to nested objects that will hold our api data hits
  const [data, setData] = useState({
    userData: {},
    rankedData: {},
  });
  var i;
  const [userList, setUserList] = useState();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    bh.getBhidByName(data.firstName)
      .then(function (users) {
        for (i = 0; i < users.length; i++) {
          setUserList([
            ...users,
            {
              id: users.length,
              brawlid: users.brawlhalla_id,
            },
          ]);
        }
        console.log(userList);
      })
      .catch(function (error) {});
  };
  const onError = (errors, e) => console.log(errors, e);
  useEffect(() => {
    //fetch data from api
    axios
      .all([
        axios.get(
          `${playerAPI}${brawlid}/stats?api_key=${apiKey}`
        ),
        axios.get(
          `${playerAPI}${brawlid}/ranked?api_key=${apiKey}`
        ),
      ])
      .then((response) => {
        //sets each get request to an object in an array
        setData({ userData: response[0].data, rankedData: response[1].data }); // sets the responses from calls to data objects
      });
  }, [brawlid]); //only run useEffect if brawlid params have changed
  //check if data has been loaded
  
  !userList ?
    !data ?  
          <h1>Loading</h1>
          : <div>
          <Navbar />
          <div className="sidebar">
            <h4 className="text-white label">Enter a Player Name to search</h4>

            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <input 
                placeholder="User Name" 
                name="firstName" 
                ref={register} />
                <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
            <div className="mt-5"></div>
          </div>
          <UserCard userData={data.userData} rankedData={data.rankedData} />
          <Legends legends={data.userData.legends} />
        </div>
          :
     <Redirect to={{ pathname: "/stats", state: { users: userList } }} />;
  }

export default User;

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/navbar.component'
import { useForm } from "react-hook-form";
import useDataApi from 'use-data-api';
import ms from 'ms'
import TrackButton from './trackButton.component/trackButton.component';
import './track.css'


function Track(){
    const apiKey = process.env.REACT_APP_API_KEY;
    const [user, setUser] = useState('')
    const [userName, setUserName] = useState('testing')
    const [elo, setElo] = useState('1950')
    const [initElo, setInitElo] = useState('0')
    const [wins, setWins] = useState(0)
    const [games, setGames] = useState(null)
    const [initWins, setInitWins] = useState(0)
    const [initGames, setInitGames] = useState(games)
    const [change, setChange] = useState(0)
    const [tableClasses, setTableClasses] = useState('data col')
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => setUser(data.firstName, e);
    const onError = (errors, e) => console.log(errors, e);
    const [{ data, isLoading, isError }, doFetch] = useDataApi(
        `https://api.brawlhalla.com/player/${user}/ranked?api_key=${apiKey}`,
         [] ,
        //initializes data varaiable to an empty array. data === []
      );

      //this works well to display a few stats directly from the api
      // but i think the end game is to have the initializeUser function set an init wins variable
      //that way we can craft some data ourselves such as wins since tracking and win rate since tracking
      // it would also be cool to add a color picker to the page to let user style their own table

      function initializeUser() {
     //the idea is that we run initialize user if we have not already done so. if we have then we set an interval and update the user on that interval
     doFetch(`https://api.brawlhalla.com/player/${user}/ranked?api_key=${apiKey}`);
     setUserName(data.name);
     setElo(data.rating);
     setWins(data.wins );
     setGames(data.games);
     if(games === data.games){
       //we want this to trigger after the first interval that initializes the user
       setInitWins(data.wins)
       setInitGames(data.games)
       setInitElo(data.rating)
console.log(`initializing user ${userName}`)
     } else{
       //else triggers after the user has already been initialized. sets games wins games and change to 0 and updates on interval 
       setWins(data.wins - initWins)
       setGames(data.games - initGames)
       setElo(data.rating)
       setChange(data.rating - initElo)
console.log(`updating user ${userName}`)
     }
     if(change < 0){
       //if net elo is negative apply red text css
      setTableClasses('data negative col')
    }else{
      //if net elo is positive apply green text css
      setTableClasses('data positive col')
    }
  
   }

   //the reason why it takes multiple cycles if we just use initialize user is the when we include update user the dom gets updated with new variables instantly
//because we run the initialize function, the DOM updates then the update user function has already run so the DOM updates again to reflect these new changes
//this allows us to do some quick operations and change games and change to 0 on seeminly 1 interval
function updateUser(){
    setWins(data.wins - initWins)
    setGames(data.games - initGames)
    setElo(data.rating)
    setChange(data.rating - initElo)
console.log(`updating user ${userName}`)
   }

      useEffect(() =>{
        doFetch(`https://api.brawlhalla.com/player/${user}/ranked?api_key=${apiKey}`);
        initializeUser()
        setInterval((updateUser),ms('5m'))
        //working like this, but intervals ocassionally double up
       })
//one thing that we could implement before adding dynamic path to track ie: (brawl-buddy/track/{brawhallaid})
//1.add a checkbox for green screen stream use. if checked the background color of the component turns green screen green
     return(
         <div>
           <Navbar />
           
       
        {isLoading ?(
        //we return this when the page is updating user stats
        <div><h1>updating stats! beep boop beep</h1></div>)     
        :(//this returns after loading 
            <div>
              <div className="idEnter">
              {isError && 
       //this displays when there is an error with the api call such as an invalid brawlhallaID 
       <div className="text-dark"><h1>Enter a valid Brawlhalla ID to start tracking stats!</h1></div>}
             <form onSubmit={handleSubmit(onSubmit, onError)}>
       <input placeholder="brawl id" name="firstName" ref={register} />
       <TrackButton />
     </form>
          </div>
     <div className="text-center table-container ">
         <table className="table-hover tableShape">
        <thead>
         <tr>
         <th scope="col" className="mx-3 px-3"></th>
         <th scope="col" className="mx-3 px-3"></th>
          <th scope="col" className="mx-3 px-3 col1"></th>
          <th scope="col"className="mx-3 px-3 col2">Net Elo</th>
          <th scope="col"className="mx-3 px-3 col3">Current Elo</th>
          <th scope="col"className="mx-3 px-3 col4">Wins</th>
          <th scope="col" className="mx-3 px-3 col5">Games</th>
          <th scope="col"className="mx-3 px-3 col4"></th>
          </tr>
          </thead>
  <tbody>
  <tr>
  <td className="col1">
  </td>
  <td className="col1">
  </td>
    <td className="col1">{userName}
  </td>
    <td className={`${tableClasses}2`}>{change}</td>
    <td className="data col3">{elo}</td>
    <td className="data col4">{wins}</td>
    <td className="data col5">{games}</td>
    <td className="data col4 hiddenCol">900000</td>
  </tr>
  </tbody>    
      </table>
      </div>
         </div>            
     )}
     </div>
     );
}

export default Track;
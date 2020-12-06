import React, { Fragment, useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import useDataApi from 'use-data-api';
import './ranked.component.css'
import Navigation from '../Navbar/navbar.component'


function Ranked() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [query, setQuery] = useState('') // we want to be able to append the api search with a query when the query is not null
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => setQuery(data.firstName, e);
  const onError = (errors, e) => console.log(errors, e);
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState('all')
  const [bracket, setBracket] = useState('1v1')
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `https://api.brawlhalla.com/rankings/${bracket}/${region}/${page}?name=${query}&api_key=${apiKey}`,
     [] ,
    
  );
 
  useEffect(() =>{
    doFetch(`https://api.brawlhalla.com/rankings/${bracket}/${region}/${page}?name=${query}&api_key=${apiKey}`)
  })
  
  // we probably need to work on getting the buttons to their own components so we can display for each
  return (
    <Fragment id="ranked">
      <Navigation />
      {isError && <div ClassName="text-white">Something went wrong ...</div>}

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div id="ranked">
        <div className="data-container">
          
    

          <div className="header">
        <div className="row">
          <div className="col">
          <p className="text-white label">Bracket</p>
          <button className="btn btn-primary"onClick={() => setBracket('1v1')}>1v1</button>
          <button className="btn btn-primary"onClick={() => setBracket('2v2')}>2v2</button>
          </div>
          </div>
          <p className="text-white label">Region</p>
          <button className="btn btn-primary"onClick={() => setRegion('all')}>Global</button>
          <button className="btn btn-primary"onClick={() => setRegion('us-e')}>US-e</button>
          <button className="btn btn-primary"onClick={() => setRegion('us-w')}>US-w</button>
          <button className="btn btn-primary"onClick={() => setRegion('eu')}>Eu</button>
          <button className="btn btn-primary"onClick={() => setRegion('brz')}>Brz</button>
          <button className="btn btn-primary"onClick={() => setRegion('sea')}>Sea</button>
          <button className="btn btn-primary"onClick={() => setRegion('jpn')}>Jpn</button>
          <button className="btn btn-primary"onClick={() => setRegion('aus')}>Aus</button>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label className="text-white" for="firstName">Search User</label>
      <input placeholder="User Name" name="firstName" ref={register} />
      <button  className="btn btn-light"type="submit">Search</button>
    </form>
          <h1 className="text-white">{region} region {bracket} results for: "{query}"</h1>
          <div className="row">
            <div className="col-4">
            <p style={{cursor:'pointer'}} className="pageBtn text-white"onClick={() => setPage(page - 1)}>Prev Page</p>
            </div>
            <div className="col-4">
            <p className="text-white">{page}</p>
            </div>
            <div className="col-4">
            <p style={{cursor:'pointer'}} className="pageBtn text-white" onClick={() => setPage(page + 1)}>Next Page</p>
            </div>
          </div>
          </div>

            <div className="row legend">
            <div className="col rank-header table-legend"><h4>Rank</h4></div>

            <div className="col  table-legend"><h4>Name</h4></div>
              <div className="col  table-legend"><h4>Elo</h4></div>
              <div className="col  table-legend"><h4>Peak</h4></div>
              <div className="col table-legend"><h4>Win %</h4></div>


            </div>
          {data.map(item => (
              <div className="row my-3 rank-row" key={item.rank || item.teamname}>
              <div className="col-2 rank-col"><strong>{item.rank}</strong></div>
              <div className="col-2">{item.teamname || item.name.substring(0,15)}</div>
              <div className="col-2">{item.rating}</div>
              <div className="col-2">{item.peak_rating}</div>
          <div className="col-2">{((item.wins / item.games) * 100).toFixed(0) + '%'}</div>
            </div>
          ))}
         
          <div className="row">
            <div className="col-4">
            <button className="pageBtn btn btn-primary btn-sm"onClick={() => setPage(page - 1)}>Prev Page</button>
            </div>
            <div className="col-4">
            <p className="text-white">{page}</p>
            </div>
            <div className="col-4">
            <button className="pageBtn btn btn-primary btn-sm"onClick={() => setPage(page + 1)}>Next Page</button>
            </div>
          </div>
        


        </div>
        </div>
      )}
    </Fragment>
  );
}

export default Ranked;
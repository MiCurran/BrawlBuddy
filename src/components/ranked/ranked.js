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
          <button className="btn btn-primary"onClick={() => setRegion('us-e')}>US-E</button>
          <button className="btn btn-primary"onClick={() => setRegion('us-w')}>US-W</button>
          <button className="btn btn-primary"onClick={() => setRegion('eu')}>EU</button>
          <button className="btn btn-primary"onClick={() => setRegion('brz')}>BRZ</button>
          <button className="btn btn-primary"onClick={() => setRegion('sea')}>SEA</button>
          <button className="btn btn-primary"onClick={() => setRegion('jpn')}>JPN</button>
          <button className="btn btn-primary"onClick={() => setRegion('aus')}>AUS</button>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label className="text-white" for="firstName">Search User</label>
      <input placeholder="User Name" name="firstName" ref={register} />
      <button  className="btn btn-light"type="submit">Search</button>
    </form>
          <h1 className="text-white">{region} region {bracket} results for: "{query}"</h1>
          <div className="row pgs">
            <div className="col-4 pgs">
            <p style={{cursor:'pointer'}} className="pageBtn text-white"onClick={() => setPage(page - 1)}>Prev Page</p>
            </div>
            <div className="col-4 pgs">
            <p className="text-white">{page}</p>
            </div>
            <div className="col-4 pgs">
            <p style={{cursor:'pointer'}} className="pageBtn text-white" onClick={() => setPage(page + 1)}>Next Page</p>
            </div>
          </div>
          </div>

            <div className="row legend">
            <div className="col rank-header table-legend"><h4>Rank</h4></div>

            <div className="col  table-legend"><h2>Name</h2></div>
              <div className="col  table-legend"><h2>Elo</h2></div>
              <div className="col  table-legend"><h2>Peak</h2></div>
              <div className="col table-legend"><h2>Win %</h2></div>


            </div>
          {data.map(item => (
              <div className="row my-3 rank-row data" key={item.rank || item.teamname}>
              <div className="col-2 rank-col data"><strong>{item.rank}</strong></div>
              <div className="col-2 data">{item.teamname || item.name.substring(0,15)}</div>
              <div className="col-2 data">{item.rating}</div>
              <div className="col-2 data">{item.peak_rating}</div>
          <div className="col-2 data">{((item.wins / item.games) * 100).toFixed(0) + '%'}</div>
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
import React, { Fragment, useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import useDataApi from 'use-data-api';
import './ranked.component.css'
import User from './user.component'
import Navigation from '../Navbar/navbar.component'
import Sidebar from '../Navbar/sidebar.component'
import Spinner from 'react-bootstrap/Spinner'


function Ranked() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [query, setQuery] = useState('') // we want to be able to append the api search with a query when the query is not null
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => {setQuery(data.firstName, e); e.preventDefault()};
  const onError = (errors, e) => console.log(errors, e);
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState('all')
  const [bracket, setBracket] = useState('1v1')
  const [day1trend, setday1Trend] = useState(0)
  const [currentTrend, setcurrentTrend] = useState()
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
        <div>
           <div className="sidebar">
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
      <button  className="btn btn-dark"type="submit">Search</button>
    </form>
        </div>
        <div className="spinner">
        <Spinner animation="border" variant="primary" size="lg" />
        </div>
        </div>
      ) : (
        <div>
        <div className="sidebar">
          <h4 className="text-white label">Bracket</h4>
          <div className="bracketButtons">
          <button className="btn btn-primary"onClick={() => setBracket('1v1')}>1v1</button>
          <button className="btn btn-primary"onClick={() => setBracket('2v2')}>2v2</button>
          </div>
          <h4 className="text-white label region">Region</h4>
          <div className="regionButtons">
          <button className="btn btn-primary"onClick={() => setRegion('all')}>Global</button>
          <button className="btn btn-primary"onClick={() => setRegion('us-e')}>US-E</button>
          <button className="btn btn-primary"onClick={() => setRegion('us-w')}>US-W</button>
          <button className="btn btn-primary"onClick={() => setRegion('eu')}>EU</button>
          <button className="btn btn-primary"onClick={() => setRegion('brz')}>BRZ</button>
          <button className="btn btn-primary"onClick={() => setRegion('sea')}>SEA</button>
          <button className="btn btn-primary"onClick={() => setRegion('jpn')}>JPN</button>
          <button className="btn btn-primary"onClick={() => setRegion('aus')}>AUS</button>
          </div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label className="text-white" for="firstName"><h4>Search User</h4></label>
      <input placeholder="User Name" name="firstName" ref={register} />
      <button  className="btn btn-primary"type="submit">Search</button>
    </form>
        </div>
        <div id="ranked">
        <div className="data-container">
          
    

          <div className="header rounded">
      
          <h1 className="">{region} region {bracket} results for: "{query}"</h1>
          <div className="row pgs">
            <div className="col-4 pgs">
            <p style={{cursor:'pointer'}} className="pageBtn"onClick={() => setPage(page - 1)}>Prev Page</p>
            </div>
            <div className="col-4 pgs">
            <p className="">{page}</p>
            </div>
            <div className="col-4 pgs">
            <p style={{cursor:'pointer'}} className="pageBtn" onClick={() => setPage(page + 1)}>Next Page</p>
            </div>
          </div>
          </div>

            <div className=" legend">
              <div className="left legend-left">
            <div className=" rank-header table-legend"><h4>Rank</h4></div>
            <div className="  table-legend"><h3>Name</h3></div>
            </div>
            <div className="right legend-right">
            <div className="  table-legend regionHeader"><h3>Region</h3></div>
            <div className=" tier-header rank-header table-legend"><h3>Tier</h3></div>
              <div className=" elo-header table-legend"><h3>Elo</h3></div>
              <div className=" peak-header table-legend"><h3>Peak</h3></div>
              <div className=" table-legend"><h3>Win %</h3></div>
              </div>

            </div>
            <div className="rankedDisplay">
          {data.map(item => (
            <div className="rankedTable-container">
              <User user={item}/>
            </div>
          ))}
         </div>
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
        </div>
      )}
    </Fragment>
  );
}

export default Ranked;
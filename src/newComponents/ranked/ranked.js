import React, { Fragment, useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import useDataApi from 'use-data-api';
import './ranked.component.css'
import User from './user.component'
import Navigation from '../Navbar/navbar.component'
import Spinner from 'react-bootstrap/Spinner'
import { Col, Row } from 'react-bootstrap';
import {baseAPI} from '../../api/baseApi'

function Ranked() {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [query, setQuery] = useState('') // we want to be able to append the api search with a query when the query is not null
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, e) => {setQuery(data.firstName, e); e.preventDefault()};
  const onError = (errors, e) => console.log(errors, e);
  const [page, setPage] = useState(1);
  const [region, setRegion] = useState('all')
  const [bracket, setBracket] = useState('1v1')
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    `${baseAPI}/${bracket}/${region}/${page}?name=${query}&api_key=${apiKey}`,
     [] ,

  );

  const regs = [
    {key: 'all', value: 'Global'},
    {key: 'us-e', value: 'US-E'},
    {key: 'us-w', value: 'US-W'},
    {key: 'eu', value: 'EU'},
    {key: 'brz', value: 'BRZ'},
    {key: 'sea', value: 'SEA'},
    {key: 'jpn', value: 'JPN'},
    {key: 'aus', value: 'AUS'}

  ]

  const pages = [0,1,2,3,4];

  useEffect(() =>{

    doFetch(`${baseAPI}/${bracket}/${region}/${page}?name=${query}&api_key=${apiKey}`)
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
          <button className="btn btn-primary" onClick={() => setBracket('1v1')}>1v1</button>
          <button className="btn btn-primary" onClick={() => setBracket('2v2')}>2v2</button>
          </div>
          </div>
          <p className="text-white label">Region</p>
             <div className="regionButtons">
             {regs.map((region, index) => (
              <button key={index} className="btn btn-primary" onClick={() => setRegion(region.key)}>{region.value}</button>
              ))}
             </div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label className="text-white" for="firstName">Search User</label>
      <input placeholder="User Name" name="firstName" ref={register} />
      <button  className="btn btn-dark" type="submit">Search</button>
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
          <button className="btn btn-primary" onClick={() => setBracket('1v1')}>1v1</button>
          <button className="btn btn-primary" onClick={() => setBracket('2v2')}>2v2</button>
          </div>
          <h4 className="text-white label region">Region</h4>
          <div className="regionButtons">
            {regs.map((region, index) => (
              <button key={index} className="btn btn-primary" onClick={() => setRegion(region.key)}>{region.value}</button>
              ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label className="text-white" for="firstName"><h4>Search User</h4></label>
      <input placeholder="User Name" name="firstName" ref={register} />
      <button  className="btn btn-primary" type="submit">Search</button>
    </form>
        </div>
        <div id="ranked">
        <div className="data-container">
          <div className="header rounded">
          <h1 className="">
            {region === 'all' && `Global `}
            {region !== 'all' && `${region} `} 
             {bracket} rankings 
            {query.length > 1 && ` results for "${query}" `} 
            </h1>
            <Row className="mt-5">
            <Col>
            <button className="pageBtn btn btn-primary btn-sm"onClick={() => setPage(page - 1)}>Prev Page</button>
            </Col>
            <Col style={{maxWidth:'fit-content', cursor:'pointer'}}>
              <Row>
            {pages.map((x,index) => {
              return(
                <div className="pgs mx-2" onClick={() => setPage(page + index)}>
                <p className="">{page + index}</p>
                </div>
              )
            }
            )}
            </Row>
            </Col>
            <Col>
            <button className="pageBtn btn btn-primary btn-sm"onClick={() => setPage(page + 1)}>Next Page</button>
            </Col>
          </Row>
          </div>
            <Row className=" legend mr-0">
              <Col xs={1} className="rankColumn" style={{maxWidth: 'fit-content'}}>
              <h4>Rank</h4>
              </Col>
              <Col className="">
              <h4>Name</h4>
              </Col>
              <Col>
              <h4>Region</h4>
              </Col>
              <Col>
              <h4>Tier</h4>
              </Col>
              <Col>
              <h4>Elo</h4>
              </Col>
              <Col>
              <h4>Peak</h4>
              </Col>
              <Col>
              <h4>Win %</h4>
              </Col>
            </Row>
            <div className="rankedDisplay">
          {data.map(item => (
            <div className="rankedTable-container">
              <User user={item}/>
            </div>
          ))}
         </div>
          <Row className="mt-5">
            <Col>
            <button className="pageBtn btn btn-primary btn-sm"onClick={() => setPage(page - 1)}>Prev Page</button>
            </Col>
            <Col style={{maxWidth:'fit-content', cursor:'pointer'}}>
              <Row>
            {pages.map((x,index) => {
              return(
                <div className="pgs mx-2" onClick={() => setPage(page + index)}>
                <p className="">{page + index}</p>
                </div>
              )
            }
            )}
            </Row>
            </Col>
            <Col>
            <button className="pageBtn btn btn-primary btn-sm"onClick={() => setPage(page + 1)}>Next Page</button>
            </Col>
          </Row>
        </div>
        </div>
        </div>
      )}
    </Fragment>
  );
}
export default Ranked;

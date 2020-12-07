import './App.css';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';
import React,{useEffect} from "react";
import Home from './components/home.component'
import Rank from './components/ranked/use.component'
import UserStats from './components/stats/userStats.component'
import Track from './components/track/track.component'
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();
  useEffect(() => {
    ReactGA.initialize('UA-174976359-2');
    ReactGA.pageview(window.location.pathname);
  })
  return (
    <Router history={history}>
      
        <Route path="/" exact component={ Home }/>
        <Switch>
        <Route path="/ranked" exact component={ Rank }/>
        <Route path="/stats" exact component={ UserStats }/>
        <Route path="/track" exact component={ Track }/>


      </Switch>
    </Router>
  );
}

export default App;

import './App.css';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';
import React,{useEffect} from "react";
import Home from './newComponents/home.component'
import Rank from './newComponents/ranked/use.component'//this is set to the new component now 
//import UserStats from './components/stats/userStats.component'
//import Test from './components/stats/test'
import SearchComponent from './newComponents/stats/search.component'
import User from './newComponents/stats/user'
import UserTable from './newComponents/track/children/userTable'
import Track from './newComponents/track/track.component'//reimport after testing
import TrackSearch from './newComponents/track/trackSearch'
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
        <Route path="/stats" exact component={ SearchComponent }/>
          <Route path='/stats/:id' exact component={ User }/>
          <Route path='/track' exact component={TrackSearch} />
          <Route path='/track/:id' exact component={Track} />


      </Switch>
    </Router>
  );
}

export default App;

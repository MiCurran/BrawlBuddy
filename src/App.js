import './App.css';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';
import React,{useEffect} from "react";
import Home from './components/home.component'
import Rank from './newComponents/ranked/use.component'//this is set to the new component now 
import UserStats from './components/stats/userStats.component'
import Test from './components/stats/test'
import SearchComponent from './newComponents/stats/search.component'
import User from './newComponents/stats/user'
//import Track from './components/track/track.component'//reimport after testing
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

function App() {
  const history = createBrowserHistory();
  useEffect(() => {
    ReactGA.initialize('UA-174976359-2');
    ReactGA.pageview(window.location.pathname);
  })

  //this may have been working and i just took it out to early. testing with the above set up and we will reassess 
  // Initialize google analytics page view tracking
  // history.listen(location => {
  //   ReactGA.initialize('UA-174976359-2');
  //   ReactGA.set({ page: location.pathname }); // Update the user's current page
  //   ReactGA.pageview(location.pathname); // Record a pageview for the given page
  // });
  return (
    <Router history={history}>
      
        <Route path="/" exact component={ Home }/>
        <Switch>
        <Route path="/ranked" exact component={ Rank }/>
        <Route path="/stats" exact component={ UserStats }/>
         <Route path="/test" exact component={ SearchComponent }/> 
          <Route path='/test/:id' exact component={ User }/>

      </Switch>
    </Router>
  );
}

export default App;

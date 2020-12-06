import React from 'react';
import {Link} from 'react-router-dom'

function Navbar(){//the home component will just display a navbar with links to ranked and stats maybe a brief desc
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/">Brawl Buddy</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link to="/" className="nav-item nav-link active" >Home <span className="sr-only">(current)</span></Link>
      <Link to="/ranked" className="nav-item nav-link" >Ranked</Link>
      <Link to="/stats" className="nav-item nav-link">Stats</Link>
      <Link to="/track" className="nav-item nav-link">Track</Link>

      
    </div>
  </div>
</nav>
    );
}

export default Navbar;
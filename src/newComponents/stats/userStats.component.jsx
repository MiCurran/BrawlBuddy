import React, { Component, Fragment } from 'react';
import './stats'
import Stats from './stats';
import Navbar from '../Navbar/navbar.component'

class UserStats extends Component {
    state = {  }
    render() { 
        return ( <Fragment>
            <Navbar/>
            <Stats/>
            </Fragment> );
    }
}
 
export default UserStats;
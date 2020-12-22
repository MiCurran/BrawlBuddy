import React, { Component, Fragment } from 'react';
import Ranked from './ranked/ranked';
class Home extends Component {
    state = {  }
    render() { 
        return ( <Fragment>
            <Ranked />
            </Fragment>
            ); //home will end up being our default page so "all" will pass global ranks
    }
}
 
export default Home;
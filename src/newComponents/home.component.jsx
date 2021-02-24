import React, { Fragment } from 'react';
import Ranked from './ranked/ranked';
export default function Home () {
        return ( <Fragment>
            <Ranked />
            </Fragment>
            ); //home will end up being our default page so "all" will pass global ranks
    };

import { data } from 'jquery';
import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

function Chart(props){
    const defaultLabelStyle = {
        fontSize: '10px',
        fontFamily: 'sans-serif',
      };
    return(
    <PieChart 
    data={[
        { title: 'Wins', value: props.wins, color: '#E38627' },
        { title: 'Losses', value: (props.games - props.wins), color: '#C13C37' },
      ]}
      radius={25}
      label={({ dataEntry }) => dataEntry.title}
      labelStyle={{
        ...defaultLabelStyle,
      }}
    />)
}
export default Chart;
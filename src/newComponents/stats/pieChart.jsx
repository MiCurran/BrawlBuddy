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
    style={{height:'250px'}}
    data={[
        { title: 'W', value: props.wins, color: '#E38627' },
        { title: 'L', value: (props.games - props.wins), color: '#C13C37' },
      ]}
      radius={20}
      label={({ dataEntry }) => (dataEntry.value + "" + dataEntry.title)}
      labelStyle={{
        ...defaultLabelStyle,
      }}
    />)
}
export default Chart;
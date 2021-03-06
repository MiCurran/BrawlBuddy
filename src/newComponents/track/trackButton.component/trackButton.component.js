import React, { useState, useEffect } from 'react';
import './trackButton.component.css'
function TrackButton(props){
    return(<button type="submit" class="blobby-button">{props.label} <span class="inner">
    <span class="blobs">
      <span class="blob"></span>
   <span class="blob"></span>
   <span class="blob"></span>
  
      <span
      class="blob"></span>
          </span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
              <defs>
                  <filter id="goo">
                      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
                      result="goo"></feColorMatrix>
                      <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
                  </filter>
              </defs>
          </svg>
  </button>);
}

export default TrackButton;
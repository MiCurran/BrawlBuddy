import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default function FAQ(props){
    return(
        <Accordion style={{
            cursor: 'pointer',
            width:'500px',
            paddingRight:'10%'}} defaultActiveKey="0">
<Card>
    <Accordion.Toggle as={Card.Header} eventKey="0"style={{
        display:'flex',
        justifyContent:'space-between'}}
    >
    <svg viewBox="0 0 100 80" width="40" height="20">
  <rect width="100" height="10"></rect>
  <rect y="30" width="100" height="10"></rect>
  <rect y="60" width="100" height="10"></rect>
</svg><strong> What is this?</strong>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        <div className="card-body">
<div>
<p>Track is a tool which allows content creators and players to display select statistics about their session that update in real time!</p>
<h5>Stats currently tracked include</h5>
<ul>
    <li>Games played in session</li>
    <li>Win / loss record for session</li>
    <li>Current Elo rating</li>
    <li>Net Elo for session</li>

</ul>
</div>
    </div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1"
    style={{
        display:'flex',
        justifyContent:'space-between',
        }}
    >
    <svg viewBox="0 0 100 80" width="40" height="20">
  <rect width="100" height="10"></rect>
  <rect y="30" width="100" height="10"></rect>
  <rect y="60" width="100" height="10"></rect>
</svg><strong> Where is my Brawlhalla ID</strong>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
        <div className="card-body">
<div>
    <p>You can find your brawlhalla id in game in the inventory section labeled "User ID"</p>
    <img src={`${process.env.PUBLIC_URL}/brawlidlocation.png`} alt=''></img>
    </div>
    </div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="2"style={{
        display:'flex',
        justifyContent:'space-between'}}
    >
    <svg viewBox="0 0 100 80" width="40" height="20">
  <rect width="100" height="10"></rect>
  <rect y="30" width="100" height="10"></rect>
  <rect y="60" width="100" height="10"></rect>
</svg><strong> How do I customize my tracker?</strong>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="2">
      <Card.Body>
        <div className="card-body">

    <p>After the tracker starts, click the dropdown menu labeled "Customize"</p>
    </div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  
</Accordion>
    )
}
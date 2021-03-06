import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar.component";
import UserTable from "./children/userTable";
import { TwitterPicker } from "react-color";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import ToastComponent from "./children/ToastComponent";
import ms from "ms";
import "./track.css";

function Track(props) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const bh = require("brawlhalla-api")(apiKey);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState();
  const [userLoaded, setLoaded] = useState(false);
  const [background, setBackground] = useState("#9a02ff");

  //hhere this works well, the only issue is having to wait for the first interval to show username and init stats
  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  useEffect(() => {
    if (props.location.state === undefined) {
      let id = props.match.params.id;
      bh.getPlayerRanked(id).then(function (playerRanked) {
      });
      setInterval(() => {}, ms("10m"));
    } else {
      let initUser = props.location.state.user;
      setUsername(props.location.state.user.username);
      setInterval(() => {
        bh.getPlayerRanked(initUser.brawlid).then(function (playerRanked) {
          console.log(playerRanked);
          setUser({
            username: playerRanked.name,
            wins: playerRanked.wins - initUser.initWins,
            games: playerRanked.games - initUser.initGames,
            rating: playerRanked.rating,
            netRating: playerRanked.rating - initUser.initRating,
            get losses() {
              return this.games - this.wins;
            },
          });
          setLoaded(true);
        });
      }, ms("1m"));
    }
  }, [props]);

  if (props.location.state === undefined) {
    
    return (
      <div>
        <Navbar />
        <p>Work in progress</p>
        <p>
          Please go to the track page and enter your id there to track stats
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
          <ToastComponent color={background} username={username}/> 
          <Accordion
          style={{ cursor: "pointer", width: "500px" }}
          defaultActiveKey="0"
          >
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <svg viewBox="0 0 100 80" width="40" height="20">
                <rect width="100" height="10"></rect>
                <rect y="30" width="100" height="10"></rect>
                <rect y="60" width="100" height="10"></rect>
              </svg>
              <strong> Customize your tracker!</strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div className="card-body">
                  <TwitterPicker
                    color={background}
                    onChangeComplete={handleChangeComplete}
                  />
                  <p>Header Color</p>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <UserTable 
          header={background} 
          user={user} 
          name={username} 
        />
      </div>
    );
  }
}

export default Track;

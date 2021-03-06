import Toast from "react-bootstrap/Toast";
import { useState } from 'react';
import ms from "ms";

export default function ToastComponent (props) {
    const [show, setShow] = useState(true);

    return ( 
        <Toast
onClose={() => setShow(false)}
show={show}
delay={ms("2m")}
autohide
style={{
  position: "absolute",
  bottom: 0,
  right: 0,
}}
>
<Toast.Header style={{ backgroundColor: props.color }}>
  <img
    src="holder.js/20x20?text=%20"
    className="rounded mr-2"
    alt=""
  />
  <strong className="mr-auto text-white">
    Brawl Buddy Tracker Help
  </strong>
  <small>Now</small>
</Toast.Header>
<Toast.Body>
  <p>You are tracking {props.username}</p>
  <p>Stats will begin tracking in 1 minute!</p>
  <p>
    Use the color picker in the customize tab to customize your
    tracker!
  </p>
</Toast.Body>
</Toast>
    )
}

import './App.css';
import {useState, useEffect} from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  function sendMessage() {
    console.log("Button Clicked");
    socket.emit("send_message", { message: message });
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  
  return (
    <div className="App">
      <input placeholder = "Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }} />
      <button onClick = {sendMessage}>Send Message</button>
      <h1>Message: {messageReceived}</h1>
    </div>
  );
}

export default App;

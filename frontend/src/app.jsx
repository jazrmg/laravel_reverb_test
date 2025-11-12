import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import "./echo"; // Import the echo setup
import "./app.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Ensure Echo is initialized
    if (window.Echo) {
      const channel = window.Echo.channel("testing");

      channel
        .subscribed(() => {
          console.log("Subscribed to 'testing' channel!");
          setListening(true);
        })
        .listen("TestMessage", (e) => {
          const newMessage = {
            id: Date.now(), // Simple unique key
            text: e.message,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          console.log("Event Received!", newMessage);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

      // Cleanup on component unmount
      return () => {
        window.Echo.leave("testing");
        console.log("Left 'testing' channel.");
      };
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app-container">
      <h1>Laravel Reverb is Live!</h1>
      <p>
        {listening
          ? "Listening for messages on the 'testing' channel..."
          : "Connecting to Reverb..."}
      </p>
      <div className="message-window">
        <ul className="message-list">
          {messages.map((msg, index) => (
            <li key={msg.id} className="message-item">
              <div className="message-content">
                <span className="message-text">{msg.text}</span>
                <span className="message-time">{msg.time}</span>
              </div>
            </li>
          ))}
          <li ref={messagesEndRef} />
        </ul>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

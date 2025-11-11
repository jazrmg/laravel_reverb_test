
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function Test() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen on the 'testing' channel for an event named 'TestMessage'
        window.Echo.channel("testing").listen("TestMessage", (e) => {
            console.log("Event Received!");
            setMessages((prevMessages) => [...prevMessages, e.message]);
        });

        // Clean up the subscription on component unmount
        return () => {
            window.Echo.channel("testing").stopListening("TestMessage");
        };
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Test Component</div>
                        <div className="card-body">
                            <p>Messages received:</p>
                            <ul>
                                {messages.map((msg, index) => (
                                    <li key={index}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Test;

if (document.getElementById("test")) {
    const Index = ReactDOM.createRoot(document.getElementById("test"));
    Index.render(
        <React.StrictMode>
            <Test />
        </React.StrictMode>
    );
}

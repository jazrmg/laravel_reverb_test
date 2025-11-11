// resources/js/app.js

import "./bootstrap";
import "./echo.js";

// Listen on the 'testing' channel for an event named 'TestMessage'
window.Echo.channel("testing").listen("TestMessage", (e) => {
    console.log("Event Received!");
    console.log(e.message);
});

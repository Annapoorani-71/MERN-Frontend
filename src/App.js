//client->src->app.js
import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userNames, setUserNames] = useState([]);

  const handlePost = () => {
    axios.post('http://localhost:5000/register', { name, email })//ameen, ameen@gmail.com
      .then((response) => {
        const result = response.data;
        if (result) {
          alert("Data saved successfully");
          setEmail("");
          setName("");
        }
      })
      .catch((error) => {
        console.error("POST request error:", error);
        alert("Something went wrong when saving data.");
      });
  }

  const handleGet = () => {
    axios.get('http://localhost:5000/')
      .then((response) => {               //thejaswini, jaya, ameen
        const users = response.data;      //names -> array
        const names = users.map((user) => user.name);   //map-> used for iteration
        setUserNames(names);
      })
      .catch((error) => {
        console.error("GET request error:", error);
      });
  }

  return (
    <div className="container">
      <h1>From</h1>
      <form>
        <input
          type="text"
          placeholder="name"
          value={name}        //take the value from the user
          onChange={(f) => setName(f.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={handlePost}>Post</button>
        <button type="button" onClick={handleGet}>Get</button>
      </form>
      <p>Names: {userNames.join(", ")}</p>
    </div>
  );
}

export default App;
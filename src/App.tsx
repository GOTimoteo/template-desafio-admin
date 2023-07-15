import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Router from "routes";

/**
 * Local, on development environment
 * API: http://localhost:3001/api/users
 * React App: http://localhost:3000
 *
 * Cloud, on production environment
 * API: http://localhost:3000/api/users | https://dashboard.heroku.com/apps/nome-do-meu-app/api/users
 * React App: http://localhost:3000 | https://dashboard.heroku.com/apps/nome-do-meu-app
 */

function App() {
  const [users, setUsers] = useState([]);
  const url =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3001/api";

  useEffect(() => {
    fetch(`${url}/users`)
      .then(function (response) {
        return response.json();
      })
      .then(setUsers);
  }, [url]);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

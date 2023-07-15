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
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;

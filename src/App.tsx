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

// TODO: Criar error boundaries para poder tratar erros da aplicação, dando feedback visual conduzindo a uma página de erro ou com mensagem através de toasts por exemplo.

export default App;

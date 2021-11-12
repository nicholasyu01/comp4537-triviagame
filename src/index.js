import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import TopBar from './components/TopBar';

import Quiz from './views/Quiz';
import TriviaGame from './views/TriviaGame';
import Play from './views/Play';
import Create from './views/Create';
import Edit from './views/Edit';
import EditGame from './views/EditGame';
import EditQuestions from './views/EditQuestions';
import UpdateQuestion from './views/UpdateQuestion';
import Admin from './views/Admin';
import Register from './views/Register'

const hist = createBrowserHistory();

// Renders component based on route.
ReactDOM.render(
  <Router history={hist}>
    <TopBar />
    <Switch>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/admin'>
        <Admin />
      </Route>
      <Route path="/TriviaGame">
        <TriviaGame />
      </Route>
      <Route path="/play">
        <Play />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/edit">
        <Edit />
      </Route>
      <Route path="/quiz/:id" render={(props) => <Quiz {...props} />}></Route>
      <Route path="/edit/" render={(props) => <EditGame {...props} />}></Route>
      <Route path="/questions/:id" render={(props) => <EditQuestions {...props} />}></Route>
      <Route path="/updateQuestion/:id" render={(props) => <UpdateQuestion {...props} />}></Route>
      <Route path="/edit/:id" render={(props) => <Edit {...props} />}></Route>
      <Redirect from="/" to="/TriviaGame" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

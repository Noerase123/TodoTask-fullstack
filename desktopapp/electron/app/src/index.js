import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'
import './index.css';
import App from './App';
import ViewTask from './components/viewTask'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Router>
    <div>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/view">
          <ViewTask/>
        </Route>
      </Switch>
    </div>
  </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

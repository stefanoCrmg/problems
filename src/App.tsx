import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { FormstackForm } from './routes/FormstackForm';
import { Homepage } from './routes/Homepage';

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/form'>
          <FormstackForm scriptURL="VJwwdfigmmrukoKUsKJjgfxiLP3%2B7BUh%2BROfc9FZXM03rEp76Zi4XsK7km5VMhkx" />
        </Route>
        <Route path='/'>
          <Homepage />
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;

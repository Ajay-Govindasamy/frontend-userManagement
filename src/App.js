import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateGroup from './components/CreateGroup';
import GroupMemberDetails from './components/GroupDetailedView';
import RemoveGroup from './components/RemoveGroup';

function App() {
  return (
    <Router>
      {/* Routing of components */}
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/sign-in' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/create-group' component={CreateGroup} />
          <Route path='/view-group/:id' component={GroupMemberDetails} />
          <Route path='/remove-group/:id/:username' component={RemoveGroup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

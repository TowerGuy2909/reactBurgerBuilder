import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './higherOrderComponents/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import Authorization from './containers/Authorization/Authorization';
import Logout from './containers/Authorization/Logout/Logout';

class App extends Component {
  render() {
    return (
      <div >
        <Layout>
          <Switch>
            <Route path='/checkout' component={CheckOut} />
            <Route path='/orders' component={Orders} />
            <Route path='/authorization' component={Authorization} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

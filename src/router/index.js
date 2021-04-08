import React, { Component } from 'react';
import { Switch} from 'react-router-dom';

import { FrontendAuth } from './frontendAuth';
import { routerConfig } from './routes';


class Routes extends Component {
  render() {
    return (
      <Switch>
        <FrontendAuth config={routerConfig} />
      </Switch>
    )
  }
}

export default Routes
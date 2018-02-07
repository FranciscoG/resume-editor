// start sass
import '../sass/app.scss';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Test extends Component {

  render() {
    return <h1>This is a test</h1>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);

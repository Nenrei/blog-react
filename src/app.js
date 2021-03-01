import React from 'react';
import ReactDOM from 'react-dom';
import Header from './js/components/header/header';
import Router from './Router';

import './css/common.scss';
import './css/buttons.scss';
import './css/inputs.scss';

const App = () => {
  return (
    <Router/>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
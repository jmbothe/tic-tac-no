import React from 'react';
import { render } from 'react-dom';

import './css/normalize.css';
import './css/main.css';

import App from './components/App.jsx';

render(<App />, document.getElementById('root'));

module.hot.accept();

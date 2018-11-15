import Application from './Application';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css'


ReactDOM.render(<Application />, document.getElementById('root'));
serviceWorker.unregister();

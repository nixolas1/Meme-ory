import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Memo from './Memo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Memo />, document.getElementById('root'));


serviceWorker.unregister();

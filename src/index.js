import React from 'react';
import ReactDOM from 'react-dom';
import './routes/Home/less/index.css';
import IndexPage from './routes/Home'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<IndexPage />, document.getElementById('root'));
registerServiceWorker();;
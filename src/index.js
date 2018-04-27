import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import TimersDashboard from './components/TimersDashboard';
import App from './reducers'

import registerServiceWorker from './registerServiceWorker';

const store = createStore(App);

ReactDOM.render(
    <Provider store={store}>
        <TimersDashboard />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

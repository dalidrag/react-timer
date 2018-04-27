import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import TimersDashboard from './components/TimersDashboard';
import timers from './reducers/timers.js'

import registerServiceWorker from './registerServiceWorker';

const store = createStore(timers);

ReactDOM.render(
    <Provider store={store}>
        <TimersDashboard />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();

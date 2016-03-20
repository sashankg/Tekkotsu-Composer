import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './app/configureStore';
import App from './app/components/App';

render((
    <Provider store={ configureStore() }>
        <App />
    </Provider>
), document.getElementById('root'));

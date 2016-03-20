import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './app/configureStore';

render((
    <Provider store={ configureStore() }>
        <h1>Tekkotsu Console</h1>
    </Provider>
), document.getElementById('root'));

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import graph from './reducers/graphReducer';
import paper from './reducers/paperReducer';
import nodeClasses from './reducers/nodeClassReducer';
import origin from './reducers/originReducer';
import selectedElement from './reducers/selectedElementReducer';

export default function configureStore() {
    const reducers = combineReducers({
        graph,
        paper,
        nodeClasses,
        origin,
        selectedElement,
    });

    const store = createStore(
        reducers, 
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f    
        )
    );
    return store;
}

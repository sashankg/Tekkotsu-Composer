import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import graph from './reducers/graphReducer';
import nodeClasses from './reducers/nodeClassReducer';

export default function configureStore() {
    const reducers = combineReducers({
        graph,
        nodeClasses
    });
    const store = createStore(
        reducers, 
        compose(
            window.devToolsExtension ? window.devToolsExtension() : f => f    
        )
    );
    return store;
}

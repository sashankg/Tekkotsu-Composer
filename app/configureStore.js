import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import graph from './reducers/graphReducer';

export default function configureStore() {
    const reducers = combineReducers({
        graph
    });
    const store = createStore(
        reducers, 
        compose(
            window.devToolsExtension ? window.devToolsExtension() : f => f    
        )
    );
    return store;
}

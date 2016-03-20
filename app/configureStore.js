import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import graphReducer from './reducers/graphReducer';

export default function configureStore() {
    const reducers = combineReducers({
        graphReducer
    });
    const store = createStore(
        reducers, 
        compose(
            window.devToolsExtension ? window.devToolsExtension() : f => f    
        )
    );
    return store;
}

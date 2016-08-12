import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import graph from './reducers/graphReducer';
import paper from './reducers/paperReducer';
import nodeTypes from './reducers/nodeTypeReducer';
import origin from './reducers/originReducer';
import selectedElement from './reducers/selectedElementReducer';
import typeEditor from './reducers/typeEditorReducer';
import transitionTypes from './reducers/transitionTypeReducer';
import editingElement from './reducers/editingElementReducer';

export default function configureStore() {
    const reducers = combineReducers({
        graph,
        paper,
        nodeTypes,
        origin,
        selectedElement,
        typeEditor,
        transitionTypes,
        editingElement,
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

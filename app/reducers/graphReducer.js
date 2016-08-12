export default function graphReducer(state, action) {
    switch(action.type) { 
        case 'ADD_ELEMENT': {
            const array = state.array.concat(action.element.id);
            return {
                array,
                entities: array.reduce((object, id) => {
                    if(id == action.element.id) {
                        object[id] = action.element;
                    }
                    else {
                        object[id] = state.entities[id];
                    }
                    return object;
                }, {}) 
            }
        }
        case 'EDIT_ELEMENT': {
            const array = state.array;
            return {
                array,
                entities: array.reduce((object, id) => {
                    if(id == action.id) {
                        object[id] = Object.assign({}, state.entities[id], action.newData);
                    }
                    else {
                        object[id] = state.entities[id];
                    }
                    return object;
                }, {})
            }
        }
        case 'DELETE_ELEMENT': {
            const index = state.array.indexOf(action.id);
            const array = state.array
                .slice(0, index)
                .concat(state.array.slice(index + 1));
            return {
                array,
                entities: array.reduce((object, id) => {
                    object[id] = state.entities[id];
                    return object
                }, {})
            } 
        }
        case 'LOAD_DATA': {
            return action.data.graph
        }
    default: 
        return state || { array: [], entities: {} }
    }
}

export default function nodeClassReducer(state = { array: [1], entities: { 1: {name: "Hello" }}}, action) {
    switch(action.type) {
        case 'NEW_NODE_CLASS': {
            const array = state.array.concat(action.id);
            return {
                array,
                entities: array.reduce(objects, id => {
                    if(id == action.id) {
                        object[id] = new NodeClass();
                    }
                    else {
                        object[id] = state.entities[id];
                    }
                    return object;
                }, {})
            };
        }
        case 'DELETE_NODE_CLASS': {
            const i = state.array.indexOf(action.id);
            const array = state.array.slice(0, i).append(state.array.slice(i+1));
            return {
                array,
                entities: array.reduce(object, id => {
                    object[id] = state.entities[id];
                    return object;
                }, {})
            };
        }
        default: return state;
    }
}

export default function nodeTypeReducer(state, action) {
    switch(action.type) {
        case 'NEW_NODE_CLASS': {
            const array = state.array.concat(action.id);
            return {
                array,
                entities: array.reduce(objects, id => {
                    if(id == action.id) {
                        object[id] = {
                            name: "#################",
                            variables: []
                        }
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
        case 'ADD_ELEMENT': {
            return {
                array: state.array,
                entities: state.array.reduce((object, id) => {
                    if(id == action.element.typeId) {
                        const type = state.entities[id];
                        object[id] = Object.assign({}, type, { n: type.n + 1 });
                    }
                    else {
                        object[id] = state.entities[id]
                    }
                    return object;
                }, {}) 
            }
        }
        default: return state || { 
            array: [1, 2], 
            entities: { 
                1: { 
                    name: "SpeechNode",
                    variables: [
                        {
                            name: "Name",
                            type: "string",
                        },
                        {
                            name: "Text",
                            type: "string",
                        }
                    ],
                    n: 1,
                }, 
                2: { 
                    name: "Turn", 
                    variables: [
                        {
                            name: "Name",
                            type: "string",
                        }, 
                        {
                            name: "Angle",
                            type: "number",
                        }, 
                    ],
                    n: 1,
                }
            } 
        };
    }
}

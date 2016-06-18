import Joint from 'jointjs';

export default function graphReducer(state, action) {
    switch(action.type) { 
        case 'ADD_ELEMENT': {
            const element = new Joint.shapes.basic.Rect({
                position: action.position ? action.position : { x: 100, y: 100 },
                size: { width: 100, height: 100 },
                attrs: { rect: { fill: 'blue' }, text: { text: 'Node', fill: 'white' } },
                className: action.className,
            }).toJSON();
            const array = state.array.concat(element.id);
            return {
                array,
                entities: array.reduce((object, id) => {
                    if(state.entities[id]) {
                        object[id] = state.entities[id];
                    }
                    else {
                        object[id] = element;
                    }
                    return object;
                }, {}) 
            }
        }
        case 'ADD_LINK': {
            const linkObject = new Joint.dia.Link({
                source: { id: action.source },
                target: { id: action.target },
                labels: [
                    { position: 0.5, attrs: { text: { text: 'label' } } }
                ]
            })
            linkObject.attr({
                '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
            })
            const link = linkObject.toJSON();
            const array = state.array.concat(link.id);
            return {
                array,
                entities: array.reduce((object, id) => {
                    if(state.entities[id]) {
                        object[id] = state.entities[id];
                    }
                    else {
                        object[id] = link;
                    }
                    return object
                }, {})
            }
        } 
        case 'SELECT_ELEMENT': {
            const element = state.entities[action.id];
            const attrs = Object.assign({}, element.attrs, { rect: { fill: 'red' } });
            return graphReducer(state, { type: 'EDIT_ELEMENT', id: action.id, newData: { attrs } });
        }
        case 'DESELECT_ELEMENT': {
            const element = state.entities[action.id];
            const attrs = Object.assign({}, element.attrs, { rect: { fill: 'blue' } });
            return graphReducer(state, { type: 'EDIT_ELEMENT', id: action.id, newData: { attrs } });
        }
        case 'DRAG_ELEMENT': {
            const newData = { position: { x: action.x, y: action.y } };
            return graphReducer(state, { type: 'EDIT_ELEMENT', id: action.id, newData });
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
    default: 
        return state || { array: [], entities: {} }
    }
}

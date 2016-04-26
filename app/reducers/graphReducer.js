import Joint from 'jointjs';
import { editElement } from '../actions/graphActions';

export default function graphReducer(state = { array: [], entities: {} }, action) {
    switch(action.type) { 
        case 'ADD_ELEMENT': {
            console.log(action);
            const element = new Joint.shapes.basic.Rect({
                position: action.position ? action.position : { x: 100, y: 100 },
                size: { width: 100, height: 100 },
                attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
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
        case 'SELECT_ELEMENT': {
            const element = state.entities[action.id];
            const attrs = Object.assign({}, element.attrs, { rect: { fill: 'red' } });
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
    default: return state
    }
}

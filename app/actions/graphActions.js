import Joint from 'jointjs';
import { editElement } from './editingElementActions';

export function addElement(typeId, position) {
    return (dispatch, getState) => {
        const state = getState()
        const nodeType = state.nodeTypes.entities[typeId]; 
        const node = new Joint.shapes.basic.Rect({
            position: position ? position : { x: 100, y: 100 },
            size: { width: 150, height: 150 },
            attrs: { rect: { fill: 'blue' }, text: { text: nodeType.name + '()', fill: 'white' } },
            typeId,
            refName: nodeType.name.toLowerCase() + nodeType.n.toString(),
            variables: nodeType.variables.map(variable => {
                return {
                    name: variable.name,
                    value: "",
                }
            }),
        }).toJSON();
        dispatch({ type: 'ADD_ELEMENT', element: node });
        dispatch(editElement(node.id));
    }
}

export function selectElement(id) {
    return { type: 'SELECT_ELEMENT', id };
} 

export function deselectElement() {
    return { type: 'DESELECT_ELEMENT' };
}

export function dragElement(id, x, y) {
    return (dispatch, getState) => {
        const newData = { position: { x, y } };
        dispatch({ type: 'EDIT_ELEMENT', id, newData })
        const embeds = getState().graph.entities[id].embeds
        if(embeds) {
            embeds.forEach(embed => {
                dispatch({ type: 'EDIT_ELEMENT', id: embed, newData: { position: { x, y: y - 20 } } });
            })
        }
    }
}

export function editVariable(id, variableIndex, value) {
    return (dispatch, getState) => {
        const element = getState().graph.entities[id];
        const variables = element.variables.map((variable, i) => {
            if(i == variableIndex) {
                return {
                    name: variable.name,
                    value,
                }
            }
            else {
                return variable;
            }
        });
        if(variableIndex == 1) {
            if(element.type == 'link') {
                const currentText = element.labels[0].attrs.text.text;
                const text =  currentText.substr(0, currentText.indexOf('(')) + '(' + value + ')';
                const labels = [{ ...element.labels[0], attrs: { ...element.labels[0].attrs, text: { text, } } } ];
                dispatch({ type: 'EDIT_ELEMENT', id, newData: { variables, labels }});
            }
            else {
                const currentText = element.attrs.text.text
                const text =  currentText.substr(0, currentText.indexOf('(')) + '(' + value + ')';
                const attrs = { ...element.attrs, text: { ...element.attrs.text, text  } }
                dispatch({ type: 'EDIT_ELEMENT', id, newData: { variables, attrs }});
            }
        }
        else {
            dispatch({ type: 'EDIT_ELEMENT', id, newData: { variables }});
        }
    }
}

export function setOrigin(x, y) {
    return { type: 'SET_ORIGIN', origin: { x, y } };
}

export function addLink(typeId, source, target) {
    return (dispatch, getState) => {
        const transitionType = getState().transitionTypes.entities[typeId];
        const link = new Joint.dia.Link({
            source: { id: source },
            target: target.x ? target : { id: target },
            labels: [
                { position: 0.5, attrs: { text: { text: transitionType.name + '()' } } }
            ],
            attrs: {
                '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
            },
            typeId,
            variables: transitionType.variables.map(variable => {
                return {
                    name: variable.name,
                    value: "",
                }
            }),
        }).toJSON();
        dispatch({ type: 'START_LINKING', link: link.id });
        dispatch({ type: 'ADD_ELEMENT', element: link });
        dispatch(editElement(link.id));
    } 
}

export function addVertex(id, x, y) {
    return (dispatch, getState) => {
        const link = getState().graph.entities[id];
        const vertices = link.vertices || [];
        const newData = { vertices: vertices.concat({ x, y }) } 
        dispatch({ type: 'EDIT_ELEMENT', id, newData });
    }
}

export function dragVertex(id, index, x, y) {
    return (dispatch, getState) => {
        const link = getState().graph.entities[id];
        const vertices = link.vertices
        const newData = { 
            vertices: vertices.slice(0, index)
                .concat({ x, y })
                .concat(vertices.slice(index + 1))
        }
        dispatch({ type: 'EDIT_ELEMENT', id, newData });
    }
}

export function changeLinkTarget(link, newTarget) {
    return { type: 'EDIT_ELEMENT',  id: link, newData: { target: { id: newTarget } } }
}

export function deleteElement(id) {
    return { type: 'DELETE_ELEMENT', id };
}

export function addElement(position) {
    return { type: 'ADD_ELEMENT', position };
}

export function selectElement(id) {
    return { type: 'SELECT_ELEMENT', id };
} 

export function deselectElement() {
    return (dispatch, getState) => {
        const id = getState().selectedElement;
        dispatch({ type: 'DESELECT_ELEMENT', id });
    } 
}

export function dragElement(id, x, y) {
    return { type: 'DRAG_ELEMENT', id, x, y };
}

export function setOrigin(x, y) {
    return { type: 'SET_ORIGIN', origin: { x, y } };
}

export function addLink(source, target) {
    return { type: 'ADD_LINK', source, target };
}

export function compile() {
    return (_, getState) => {
        const state = getState();

        function defineNodeClasses(agg, nodeClasses) {
            const nodeClass = nodeClasses[0];
            const definition = `
            $nodeclass ${ nodeClass.name } : StateNode : doStart {

            } 

            `;
            return defineNodeClasses(agg + definition, nodeClasses.slice(1)); 
        }

        var code = `
        #include "Behaviors/StateNode.h"

        $nodeclass Machine : StateNode {

            ${ defineNodeClasses('', state.nodeClasses) }

            $setupmachine{

            }

        }

        REGISTER_BEHAVIOR(ConversationMachine);
        `;
    }
}

export default function editingElement(state, action) {
    switch(action.type) {
        case 'START_EDITING': {
            return action.element;
        }
        case 'STOP_EDITING': {
            return null;
        }
        default: {
            return state || null;
        }
    }
}

export default function editingElement(state, action) {
    switch(action.type) {
        case 'START_EDITING': {
            return { id: action.element, firstTime: action.firstTime };
        }
        case 'STOP_EDITING': {
            return null;
        }
        default: {
            return state || null;
        }
    }
}

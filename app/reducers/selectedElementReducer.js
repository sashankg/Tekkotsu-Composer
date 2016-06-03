export default function selectedElementReducer(state, action) {
    switch(action.type) {
        case 'SELECT_ELEMENT':
            return action.id;
        case 'DESELECT_ELEMENT':
            return null;
        default: 
            return state || null
    }
}

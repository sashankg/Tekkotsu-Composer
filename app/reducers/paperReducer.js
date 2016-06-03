export default function paperReducer(state, action) {

    switch(action.type) {
        case 'START_DRAGGING':
            return Object.assign({}, state, { dragging: true });
        case 'STOP_DRAGGING':
            return Object.assign({}, state, { dragging: false });
        case 'START_PANNING':
            return Object.assign({}, state, { panning: true, panPoint: action.panPoint });
        case 'STOP_PANNING':
            return Object.assign({}, state, { panning: false, panPoint: null });
        case 'START_LINKING':
            return Object.assign({}, state, { linking: true });
        case 'STOP_LINKING':
            return Object.assign({}, state, { linking: false });
        default:
            return state || {
                dragging: false,
                panning: false,
                panPoint: null,
                linking: false,
            }
    }
} 

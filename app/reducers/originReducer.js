export default function originReducer(state, action) {
    switch(action.type) {
        case 'SET_ORIGIN':
            return {
                x: action.x,
                y: action.y
            }
        default: 
            return state || { x: 0, y: 0 }
    }
}

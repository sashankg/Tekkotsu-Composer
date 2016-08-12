export default function typeEditorReducer(state, action) {
    switch(action.type) {
        case 'EDIT_TYPE': {
            return {
                nodeType: action.nodeType,
                open: true,
            }
        }
        case 'CLOSE_TYPE_EDITOR': {
            return {
                nodeType: null,
                open: false
            }
        }
        default: {
            return state || {
                nodeType: null,
                open: false,
            }
        }
    }
}

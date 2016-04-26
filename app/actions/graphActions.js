export function addElement(position) {
    return { type: 'ADD_ELEMENT', position };
}

export function selectElement(id) {
    return { type: 'SELECT_ELEMENT', id };
} 

export function dragElement(id, x, y) {
    return { type: 'DRAG_ELEMENT', id, x, y };
}

export function selectElement(id) {
    return { type: 'SELECT_ELEMENT', id };
} 

export function addElement() {
    return { type: 'ADD_ELEMENT' };
}

export function dragElement(id) {
    return { type: 'DRAG_ELEMENT', id }
}

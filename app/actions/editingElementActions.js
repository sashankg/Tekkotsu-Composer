export function editElement(id) {
    return { type: 'START_EDITING', element: id };
}

export function stopEditing() {
    return { type: 'STOP_EDITING' };
}

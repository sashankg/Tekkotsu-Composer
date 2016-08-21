export function editElement(id, f) {
    const firstTime = f ? true : false
    return { type: 'START_EDITING', element: id, firstTime };
}

export function stopEditing() {
    return { type: 'STOP_EDITING' };
}

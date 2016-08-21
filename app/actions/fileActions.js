import { saveAs } from 'file-saver';
export function saveFile() {
    return (_, getState) => {
        const state = getState();
        const json = JSON.stringify(state);
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob)
    }
}

export function loadFile(blob) {
    return dispatch => {
        const fr = new FileReader();
        fr.onload = (event) => {
            const data = JSON.parse(event.target.result);
            dispatch({ type: 'LOAD_DATA', data });
        }
        fr.readAsText(blob)
    }
}

export function initializeTypes() {
    return dispatch => {
        var nodeTypes = { array: [], entities: {} }
        data.nodeTypes.map((type, i) => {
            nodeTypes.array.push(i);
            nodeTypes.entities[i] = type;
        });

        var transitionTypes = { array: [], entities: {} }
        data.transitionTypes.map((type, i) => {
            transitionTypes.array.push(i);
            transitionTypes.entities[i] = type;
        });

        dispatch({ type: 'LOAD_DATA', data: { nodeTypes, transitionTypes } });
    }
}

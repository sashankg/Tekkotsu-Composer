import { saveAs } from 'file-saver';
export function compile() {
    return (dispatch, getState) => {
        const state = getState();
        const graph = state.graph;
        const nodes = graph.array
            .filter(id => graph.entities[id].type != 'link')
        const nodeDeclarations = nodes.map((id) => {
                const element = graph.entities[id];
                const name = element.variables[0].value || element.refName;
                const type = state.nodeTypes.entities[element.typeId];
                const variables = element.variables
                    .slice(1)
                    .map((variable, i) => variableToValue(type, i, variable))
                    .join(', ');
                return name + ": " + type.name + "(" + variables + ")"
        });
        const nodeNames = nodes.reduce((o, id) => {
            const element = graph.entities[id];
            o[id] = element.variables[0].value || element.refName;
            return o;
        }, {})
        const transitionDeclarations = graph.array
            .filter(id => graph.entities[id].type == 'link')
            .map(id => {
                const element = graph.entities[id];
                const type = state.transitionTypes.entities[element.typeId];
                const shorthand = transitionToShorthand(element, type);
                return nodeNames[element.source.id] + " " + shorthand + " " + nodeNames[element.target.id];
            })


        const source = 
`#include "Behaviors/StateNode.h"

$nodeclass Demo1 : StateNode {
    $setupmachine {
        ${ nodeDeclarations.join('\n        ') }

        ${ transitionDeclarations.join('\n        ') }
    }
}

REGISTER_BEHAVIOR(Demo1);
`
        const blob = new Blob([source], {type: "text/plain;charset=utf-8"});
        saveAs(blob, 'Demo1.cc.fsm');

    }
}

function variableToValue(type, index, variable) {
    const variableInfo = type.variables[index];
    switch(variableInfo.type) {
        case 'string':
            return '"' + variable.value +'"';
        default: 
            return variable.value;
    }
}

function transitionToShorthand(transition, type) {
    const variables = transition.variables
        .slice(1)
        .map((variable, i) => variableToValue(type, i, variable))
        .join(', ');
    switch(type.name) {
        case 'Timeout':
            return "=T(" + variables + ")=>" 
        case 'Completion': 
            return "=C=>";
        default: 
            return "==>"
    }
}

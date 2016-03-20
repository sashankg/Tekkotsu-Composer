import React from 'react';
import { connect } from 'react-redux';
import Joint from 'jointjs';
import { selectElement, dragElement } from '../actions/graphActions.js';

class Graph extends React.Component {
    componentDidMount() {
        this.graph = new Joint.dia.Graph;
        if(this.props.elements) {
            this.graph.fromJSON({ cells: this.props.elements })
        }

        var node = document.getElementById('graph');
        var paper = new Joint.dia.Paper({
            el: node,
            model: this.graph,
            gridSize: 1,
            width: node.offsetWidth,
            height: node.offsetHeight,
        });
        window.onresize = function() {
            paper.setDimensions(node.offsetWidth, node.offsetHeight);
        }

        paper.on('cell:pointerclick', this.props.selectElement);
        paper.on('cell:pointerup', this.props.dragElement)
    }

    componentWillUnmount() {
        this.graph = null; 
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(newProps) {
        this.graph.fromJSON({ cells: newProps.elements });
    }

    render() {
        return <div id="graph" />
    }
}

function mapStateToProps(state) {
    var graph = state.graph;
    return { elements: graph.elements }
}

function mapDispatchToProps(dispatch) {
    return {
        selectElement: function(cellView) {
            dispatch(Actions.selectElement(cellView.options.model.id));
        },
        addElement: function() {
            dispatch(Actions.addElement());
        },
        dragElement: function(cellView, evt) {
            var frame = cellView.getBBox();
            dispatch(Actions.dragElement(cellView.options.model.id, frame.x, frame.y));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

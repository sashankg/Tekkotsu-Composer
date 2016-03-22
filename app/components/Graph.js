import React from 'react';
import { connect } from 'react-redux';
import Joint from 'jointjs';
import { selectElement, dragElement } from '../actions/graphActions';

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragging: false
        }
    }

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
        paper.on('cell:pointerup', this.handlePointerUp.bind(this));
        paper.on('cell:pointermove', this.handlePointerMove.bind(this));
    }

    handlePointerMove() {
        this.setState({ dragging: true });
    }

    handlePointerUp(cellView) {
        if(this.state.dragging) {
            this.props.dragElement(cellView);
            this.setState({ dragging: false });
        } 
        else {
            this.props.selectElement(cellView); 
        }
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
    return { elements: graph.array.map(id => graph.entities[id]) }
}

function mapDispatchToProps(dispatch) {
    return {
        selectElement: function(cellView) {
            dispatch(selectElement(cellView.options.model.id));
        },
        dragElement: function(cellView) {
            var frame = cellView.getBBox();
            dispatch(dragElement(cellView.options.model.id, frame.x, frame.y));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Graph);

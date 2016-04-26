import React from 'react';
import { connect } from 'react-redux';
import Joint from 'jointjs';
import { addElement, selectElement, dragElement } from '../actions/graphActions';
import { DropTarget } from 'react-dnd';

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
            var frame = cellView.getBBox();
            this.props.dragElement(cellView.options.model.id, frame.x, frame.y);
            this.setState({ dragging: false });
        } 
        else {
            this.props.selectElement(cellView.options.model.id); 
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
        return this.props.connectDropTarget(<div id="graph" />);
    }
}

function mapStateToProps(state) {
    var graph = state.graph;
    return { elements: graph.array.map(id => graph.entities[id]) }
}

const mapDispatchToProps = {
    selectElement,
    dragElement,
    addElement,
}

const spec = {
  drop(props, monitor) {
      const boundingRect = document.getElementById('graph').getBoundingClientRect();
      console.log(boundingRect);
      const clientOffset = monitor.getClientOffset();
      const x = clientOffset.x - boundingRect.left;
      const y = clientOffset.y - boundingRect.top;
      props.addElement({ x, y });
  }
};

function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('node_class', spec, collect)(Graph));

import React from 'react';
import { connect } from 'react-redux';
import Joint from 'jointjs';
import { DropTarget } from 'react-dnd';

import { addElement, selectElement, deselectElement, dragElement, addLink } from '../actions/graphActions';
import { startDragging, stopDragging, startPanning, stopPanning, startLinking, stopLinking } from '../actions/paperActions';

class Graph extends React.Component {
    componentDidMount() {
        this.graph = new Joint.dia.Graph;
        if(this.props.elements) {
            this.graph.fromJSON({ cells: this.props.elements })
        }

        var node = document.getElementById('graph');
        this.paper = new Joint.dia.Paper({
            el: node,
            model: this.graph,
            gridSize: 1,
            width: node.offsetWidth,
            height: node.offsetHeight,
        });
        this.paper.setOrigin(this.props.origin.x, this.props.origin.y);

        //Dragging and selecting
        this.paper.on('cell:pointerup', this.handlePointerUp.bind(this));
        this.paper.on('cell:pointermove', this.handlePointerMove.bind(this));
        this.paper.on('cell:pointerdblclick', this.handleDoubleClick.bind(this));
        this.paper.on('cell:pointerclick', this.handleClick.bind(this));

        //Panning
        this.paper.on('blank:pointerdown', this.handleBlankPointerDown.bind(this));
        document.addEventListener('mousemove', this.handlePan.bind(this));
        document.addEventListener('mouseup', this.handlePanEnd.bind(this));
    }

    handlePointerMove(cellView) {
        if(cellView.model.attributes.type == 'link') {
            if(!this.props.linking) {
                this.props.startLinking();
            }
        }
        else if(!this.props.dragging) {
            this.props.startDragging();
        }
    }

    handlePointerUp(cellView) {
        if(this.props.dragging) {
            var frame = cellView.getBBox();
            const origin = this.props.origin;
            this.props.dragElement(cellView.model.id, frame.x - origin.x, frame.y - origin.y);
            this.props.stopDragging();
        } 
    }

    handleClick(cellView) {
        if(!this.props.linking) {
            this.props.startLinking();
            this.props.selectElement(cellView.model.id); 
        }
        else {
            this.props.stopLinking();
            this.props.addLink(this.props.selectedElement, cellView.model.id);
            this.props.deselectElement();
        }
    }

    handleDoubleClick(cellView) {
        console.log(cellView);
        this.props.addLink(cellView.model.id);
    }

    handleBlankPointerDown(_, x, y) {
        const boundingRect = document.getElementById('graph').getBoundingClientRect();
        this.props.startPanning({ x: x + boundingRect.left, y: y - boundingRect.top });
    }

    handlePan(event) {
        if(this.props.panning) {
            const x = -(this.props.panPoint.x - event.clientX);
            const y = -(this.props.panPoint.y - event.clientY);
            this.paper.setOrigin(x, y);
        }
    }

    handlePanEnd() {
        if(this.props.panning) {
            const origin = this.paper.options.origin;
            this.props.stopPanning(origin.x, origin.y);
        }
    }

    componentWillUnmount() {
        this.graph = null; 
        this.paper = null;
    }

    shouldComponentUpdate() {
        return false;
    }

    componentWillReceiveProps(newProps) {
        if(!compareArrays(newProps.elements, this.props.elements)) {
            console.log(newProps);
            this.graph.fromJSON({ cells: newProps.elements });
        }
    }

    render() {
        return this.props.connectDropTarget(<div id="graph" />);
    }
}

function compareArrays(a, b) {
    if(a.length != b.length) {
        return false
    }
    var i;
    for(i = 0; i < a.length; i++) {
        if(a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

function mapStateToProps(state) {
    var graph = state.graph;
    return { 
        elements: graph.array.map(id => graph.entities[id]),
        origin: state.origin,
        panning: state.paper.panning,
        dragging: state.paper.dragging,
        panPoint: state.paper.panPoint,
        linking: state.paper.linking,
        selectedElement: state.selectedElement,
    }
}

const mapDispatchToProps = {

    selectElement,
    deselectElement,
    dragElement,
    addElement,
    startDragging,
    stopDragging,
    startPanning,
    stopPanning,
    addLink,
    startLinking,
    stopLinking,
}

const spec = {
  drop(props, monitor) {
      const boundingRect = document.getElementById('graph').getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const x = clientOffset.x - boundingRect.left - props.origin.x;
      const y = clientOffset.y - boundingRect.top - props.origin.y;
      props.addElement({ x, y });
  }
}

function collect(connect, monitor) {
  return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropTarget('node_class', spec, collect)(Graph));

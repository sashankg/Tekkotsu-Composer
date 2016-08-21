import React from 'react';
import { connect } from 'react-redux';
import Joint from 'jointjs';
import { DropTarget } from 'react-dnd';
import { ContextMenuLayer } from 'react-contextmenu';

import { 
    addElement, 
    selectElement, 
    deselectElement, 
    dragElement, 
    addLink, 
    dragVertex, 
    addVertex, 
    changeLinkTarget 
} from '../actions/graphActions';
import { 
    startDragging, 
    stopDragging, 
    startPanning, 
    stopPanning, 
    startLinking, 
    stopLinking 
} from '../actions/paperActions';

class Graph extends React.Component {
    componentDidMount() {
        this.graph = new Joint.dia.Graph;

        const addVertex = this.props.addVertex;
        var node = document.getElementById('graph');
        this.paper = new Joint.dia.Paper({
            el: node,
            model: this.graph,
            gridSize: 1,
            width: node.offsetWidth,
            height: node.offsetHeight,
            linkView: Joint.dia.LinkView.extend({
                pointerdblclick: function(evt, x, y) {
                    addVertex(this.model.id, x, y);
                }
            }),
            interactive: function(cellView) {
                if (cellView.model instanceof Joint.dia.Link) {
                    return { vertexAdd: false };
                }
                return true;
            }
        });
        this.paper.setOrigin(this.props.origin.x, this.props.origin.y);

        if(this.props.elements) {
            this.graph.fromJSON({ cells: this.props.elements })
        }

        //Dragging and selecting
        this.paper.on('cell:pointerup', this.handlePointerUp.bind(this));
        this.paper.on('cell:pointermove', this.handlePointerMove.bind(this));

        //Selecting
        this.paper.on('cell:contextmenu', this.handleRightClick.bind(this));
        this.paper.on('blank:contextmenu', this.props.deselectElement);

        //Panning
        this.paper.on('blank:pointerdown', this.handleBlankPointerDown.bind(this));
        document.addEventListener('mousemove', this.handlePan.bind(this));
        document.addEventListener('mouseup', this.handlePanEnd.bind(this));
    }

    handlePointerMove(cellView) {
        if(cellView._arrowhead == 'target') {
            if(!this.props.linking ) {
                this.props.startLinking();
            }
        }
        else if(!this.props.dragging && (cellView._vertexIdx || !cellView.model.isLink())) {
            this.props.startDragging();
        }
    }

    handlePointerUp(cellView) {
        if(this.props.dragging) {
            if(cellView.model.isLink()) {
                const index = cellView._vertexIdx;
                const { x, y } = cellView.model.attributes.vertices[index]
                this.props.dragVertex(cellView.model.id, index, x, y);
            }
            else {
                var frame = cellView.getBBox();
                const origin = this.props.origin;
                this.props.dragElement(cellView.model.id, frame.x - origin.x + (frame.width - 150)/2, frame.y - origin.y);
            }
            this.props.stopDragging();
        } 
        else if(this.props.linking) {
            if(cellView._arrowhead == 'target') {
                if(cellView.model.getTargetElement()) {
                    this.props.changeLinkTarget(cellView.model.id, cellView.targetView.model.id)
                    this.props.stopLinking();
                }
                else {
                    this.props.stopLinking();
                    this.updateGraph.bind(this)(this.props.elements);
                }

            }
        }
    }

    handleRightClick(cellView) {
        const id = cellView.model.id;
        this.props.selectElement(id);
    }

    handleBlankPointerDown(_, x, y) {
        const boundingRect = document.getElementById('graph').getBoundingClientRect();
        if(this.props.selectedElement) {
            this.props.deselectElement();
        }
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
            this.updateGraph.bind(this)(newProps.elements, newProps.origin);
        }
    }

    updateGraph(elements, origin) {
        this.graph.fromJSON({ cells: elements });
        this.paper.setOrigin(origin.x, origin.y);
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
        linkingLink: state.paper.link,
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
    dragVertex,
    addVertex,
    startLinking,
    stopLinking,
    changeLinkTarget,
}

const spec = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        const boundingRect = document.getElementById('graph').getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();
        const x = clientOffset.x - boundingRect.left - props.origin.x;
        const y = clientOffset.y - boundingRect.top - props.origin.y;
        switch(monitor.getItemType()) {
            case 'node': {
                props.addElement(item.id, { x, y });
                return;
            }
        case 'transition': {
            const source = component.graph.findModelsFromPoint({ x, y })[0];
            if(source) {
                const position = source.attributes.position;
                const size = source.attributes.size;
                props.addLink(item.id, source.id, { x: (position.x + size.width/2), y: (position.y + size.height + 50) });
            }
            return;
        }
        }
    },
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

const dropTarget = DropTarget(['node', 'transition'], spec, collect)(Graph);
const contextMenuLayer = ContextMenuLayer('right_click_menu')(dropTarget);
export default connect(mapStateToProps, mapDispatchToProps)(contextMenuLayer);

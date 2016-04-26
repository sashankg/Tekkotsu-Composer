import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

class NodeClass extends React.Component {
    render() {
        return this.props.connectDragSource(
            <div className={ "nodeClass " + this.props.style }>
                { this.props.name }
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const nodeClass = state.nodeClasses.entities[props.id];
    return nodeClass;
}

const spec = {
  beginDrag(props) {
      return {};
    }
};

function collect(connect, monitor) {
  return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

export default connect(mapStateToProps)(DragSource('node_class', spec, collect)(NodeClass));

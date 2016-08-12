import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

class TransitionType extends React.Component {
    render() {
        return this.props.connectDragSource(
            <div 
                className={ "transitionType " + this.props.style }
            >
                { this.props.transitionType.name }
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const transitionType = state.transitionTypes.entities[props.id];
    return {
        transitionType,
    };
}

const spec = {
    beginDrag(props) {
        return {
            id: props.id,
        }
    }
};

function collect(connect, monitor) {
  return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

export default connect(mapStateToProps)(DragSource('transition', spec, collect)(TransitionType));

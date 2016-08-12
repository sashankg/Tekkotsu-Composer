import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { editType } from '../actions/typeEditorActions';

class NodeType extends React.Component {
    render() {
        return this.props.connectDragSource(
            <div 
                className={ "nodeType " + this.props.style }
                onClick={ this.onClick.bind(this) }
                style={
                    this.props.selected ? { backgroundColor: 'grey' } : {} 
                }
            >
                { this.props.nodeType.name }
            </div>
        )
    }

    onClick() {
        this.props.editType(this.props.id)
    }
}

function mapStateToProps(state, props) {
    const nodeType = state.nodeTypes.entities[props.id];
    return {
        nodeType,
        selected: state.typeEditor.nodeType == props.id,
    };
}

const mapDispatchToProps = {
    editType,
}

const spec = {
    beginDrag(props) {
        return {
            name: props.nodeType.name,
            id: props.id,
        };
    }
};

function collect(connect, monitor) {
  return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragSource('node', spec, collect)(NodeType));

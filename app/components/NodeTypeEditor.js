import React from 'react';
import { connect } from 'react-redux';

class NodeTypeEditor extends React.Component {
    render() {
        if(this.props.closed) {
            return <div className="nodeTypeEditor" style={{
                left: (-75 + this.props.left).toString() + '%'
            }} />
        }
        return <div className="nodeTypeEditor" style={{
            left: (-75 + this.props.left).toString() + '%'
        }}>
            { "Editing " + this.props.typeName }
        </div>
    }
}

function mapStateToProps(state) {
    const id = state.typeEditor.nodeType;
    if(id) {
        const type = state.nodeTypes.entities[id];
        return {
            typeName: type.name,
        }
    } else {
        return {
            closed: true,
        }
    }
}

export default connect(mapStateToProps)(NodeTypeEditor);

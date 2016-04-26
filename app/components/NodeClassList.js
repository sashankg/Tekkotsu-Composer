import React from 'react';
import { connect } from 'react-redux';
import NodeClass from './NodeClass';

class NodeClassList extends React.Component {
    render() {
        const nodeClasses = this.props.nodeClasses.map((id, i) => <NodeClass key={ i } id={ id } />);
        return (
            <div className="node-list">
                { nodeClasses }
            </div>
        );
    }
}

function mapStateToProps(state) {
    const nodeClasses = state.nodeClasses.array;
    return { nodeClasses };
}

export default connect(mapStateToProps)(NodeClassList);

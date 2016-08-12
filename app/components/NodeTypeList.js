import React from 'react';
import { connect } from 'react-redux';

import NodeType from './NodeType';
import TransitionType from './TransitionType';

import { saveFile, loadFile } from '../actions/fileActions';

class NodeTypeList extends React.Component {
    render() {
        const nodeTypes = this.props.nodeTypes.map((id, i) => <NodeType key={ i } id={ id } />);
        const transitionTypes = this.props.transitionTypes.map((id, i) => <TransitionType key={ i } id={ id } />);
        const left = this.props.left || 0
        return (
            <div className="nodeTypePane" style={{ left: left.toString() + '%'}}>
                <div>
                    <button onClick={ this.props.saveFile }>Save</button>
                    <input type="file" accept=".json" onChange={ (event) => this.props.loadFile(event.target.files[0]) } />
                </div>
                <div className="nodeListHeader">
                    <h1>Node Types</h1>
                    <button>Edit</button>
                </div>
                <div className="nodeTypeList">
                    { nodeTypes }
                </div>
                <h1>Transitions</h1>
                <div className="transitionTypeList">
                    { transitionTypes }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const nodeTypes = state.nodeTypes.array;
    const transitionTypes = state.transitionTypes.array;
    return { 
        nodeTypes,
        transitionTypes,
        typeEditorOpen: state.typeEditor.open
    };
}

const mapDispatchToProps = {
    saveFile,
    loadFile,
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeTypeList);

import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Modal from 'react-modal';
import { Motion, spring } from 'react-motion';

import Graph from './Graph';
import NodeTypeList from './NodeTypeList';
import NodeTypeEditor from './NodeTypeEditor';
import ElementEditor from './ElementEditor';
import RightClickMenu from './RightClickMenu';

import { closeTypeEditor } from '../actions/typeEditorActions';
import { stopEditing } from '../actions/editingElementActions';

class App extends React.Component {
    render() {
        if(this.props.typeEditorOpen) {
            return <Motion defaultStyle={{ x: 0 }} style={{x: spring(75)}}>
                { value => {
                    return <div className="app">
                        <NodeTypeEditor left={ value.x }/>
                        <NodeTypeList left={ value.x }/>
                        <div 
                            className="closeTypeEditorButton"
                            onClick={ this.props.closeTypeEditor }
                        />
                        <Graph />
                    </div>
                    }
                }
            </Motion>
        }
        return <Motion defaultStyle={{ x: 75 }} style={{x: spring(0)}}>
            { value => {
                return (
                    <div className="app">
                        { value.x != 0 ? <NodeTypeEditor left={ value.x }/> : null }
                        <NodeTypeList left={ value.x }/>
                        <Graph />
                        <RightClickMenu />
                        <Modal
                            isOpen={ this.props.editingElement ? true : false }
                            onRequestClose={ this.props.stopEditing }
                            style={{
                                content: {
                                    width: '20%',
                                    height: '20%',
                                    top: '40%',
                                    left: '40%'
                                }
                            }}
                        >
                            <ElementEditor />
                        </Modal>
                    </div>
                    );
                }
            }
        </Motion>
    }
}

function mapStateToProps(state) {
    return {
        editingElement: state.editingElement,
        typeEditorOpen: state.typeEditor.open,
    }
}

var mapDispatchToProps = {
    stopEditing,
    closeTypeEditor,
}
export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(App));

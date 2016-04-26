import React from 'react';
import Graph from './Graph';
import NodeClassList from './NodeClassList';
import { addElement } from '../actions/graphActions';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';

class App extends React.Component {
    render() {
        console.log(this);
        return (
            <div className="app">
                <NodeClassList />
                <Graph />
            </div>
        );
    }

    handleNewButton(event) {
        this.props.addElement();
    }
}

var mapDispatchToProps = {
    addElement
}
export default connect(null, mapDispatchToProps)(DragDropContext(HTML5Backend)(App));

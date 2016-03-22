import React from 'react';
import Graph from './Graph';
import { addElement } from '../actions/graphActions';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        console.log(this);
        return (
            <div className="app">
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
export default connect(null, mapDispatchToProps)(App);

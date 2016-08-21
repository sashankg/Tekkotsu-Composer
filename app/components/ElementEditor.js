import React from 'react';
import { connect } from 'react-redux';

import { stopEditing } from '../actions/editingElementActions';
import { editVariable } from '../actions/graphActions';

class ElementEditor extends React.Component {
    componentDidMount() {
        if(this.props.variables.length == 1 && this.props.firstTime) {
            this.props.stopEditing();
        }
    }
    render() {
        if(this.props.closed) {
            return <div />
        }
        const inputs = this.props.variables.map((variable, i) => {
            return <div key={ i }>
                <h3>{ variable.name }</h3>
                <input 
                    type="text" 
                    value={ variable.value } 
                    onChange={ (event) => {
                        this.props.editVariable(this.props.element, i, event.target.value);
                    } }
                    placeholder={ variable.name == "Name" ? this.props.refName : "" }
                />
            </div>
        })
        return <div>
            { inputs }
        </div>
    }
}

function mapStateToProps(state) {
    if(!state.editingElement) {
        return {
            closed: true
        }
    }
    else {
        const element = state.graph.entities[state.editingElement.id];
        return {
            element: element.id,
            variables: element.variables,
            refName: element.refName,
            firstTime: state.editingElement.firstTime,
        }
    }
}

const mapDispatchToProps = {
    stopEditing,
    editVariable,
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementEditor);

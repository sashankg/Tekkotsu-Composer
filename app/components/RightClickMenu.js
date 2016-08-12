import React from 'react';
import { connect } from 'react-redux';
import { ContextMenu, MenuItem } from 'react-contextmenu';

import { deselectElement, deleteElement } from '../actions/graphActions';
import { editElement } from '../actions/editingElementActions';

class RightClickMenu extends React.Component {
    render() {
        return <ContextMenu 
            identifier="right_click_menu" 
            currentItem={ this.currentItem }
        >
            <MenuItem onClick={ this.props.editElement }>
                Edit
            </MenuItem>
            <MenuItem onClick={ this.props.deleteElement }>
                Delete
            </MenuItem>
        </ContextMenu>
    }
}

function mapStateToProps(state) {
    return {
        element: state.selectedElement,
    }
}

const mapDispatchToProps = {
    deselectElement,
    editElement,
    deleteElement,
}

function mergeProps(stateProps, dispatchProps) {
    return Object.keys(dispatchProps).reduce((o, key) => {
        o[key] = () => {
            dispatchProps[key](stateProps.element);
        }
        return o;
    }, {});
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(RightClickMenu);

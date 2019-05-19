import React, { Component } from 'react';
import "./Cell.css"

class Cell extends Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.flipAdjacentCells(this.props.coords);
    }

    render() {
        return (
            <td className={"Cell"+ (this.props.isLit ? " isLit" : "")} 
            onClick={this.handleClick}
            ></td>
        );
    }
}

export default Cell;
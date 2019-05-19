import React, { Component } from 'react';
import Cell from './Cell';
import "./Board.css"

class Board extends Component {

    static defaultProps = {
        numRows: 5,
        numCols: 5,
        median: 0.8
    }
    
    constructor(props){
        super(props);
        this.state = {
            board: Array.from(new Array(this.props.numRows), // Create two dimensional board
                    x => Array.from(new Array(this.props.numCols), 
                    x => (Math.random() > this.props.median ? true : false))),
            hasWon: false
        }
        this.flipAdjacentCells = this.flipAdjacentCells.bind(this);
    }

    flipAdjacentCells(coords){
        let {numCols,numRows} = this.props;
        const [x,y] = coords.split('-').map(Number);
        let board = this.state.board;        

        function flipCells(xx,yy){
            if(xx>=0 && xx< numCols && yy>=0 && yy < numRows)
                board[xx][yy] = !board[xx][yy];
        }

        flipCells(x,y) ;//flip itself
        flipCells(x,y+1) ;//flip right
        flipCells(x,y-1) ;//flip left
        flipCells(x+1,y) ;//flip north
        flipCells(x-1,y) ;//flip south

        let hasWon = board.every(row => row.every(cell => !cell));

        this.setState({board,hasWon});
    }

    generateBoard() {
      return  this.state.board.map((rowArray,idxRow) => {
            return <tr key={idxRow}>{this.generarateCells(rowArray,idxRow)}</tr>
        });
    }

    generarateCells(rowArray,idxRow) {
        return rowArray.map((isLit,idxCol) => {
            return (
                <Cell isLit={isLit} 
                coords={idxRow+'-'+idxCol} 
                key={idxRow+'-'+idxCol} 
                flipAdjacentCells={this.flipAdjacentCells}
            />
            )
        })
    }

    render() {
        if(this.state.hasWon){
            return (
                <div className="Board-title">
                     <span className="neon-orange">YOU</span>
                    <span className="neon-blue">OUT</span>
                </div>
            )
        }
        //else
        return (
            <div className="Board">
                <div className="Board-title">
                    <div className="neon-orange">LIGHTS</div>
                    <div className="neon-blue">OUT</div>
                </div>
                <table >
                    <tbody>
                        {this.generateBoard()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board;
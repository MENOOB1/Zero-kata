import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
function getwinner(square)
{
    let winCon=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
    ]
    for(let i=0;i<winCon.length;i++)
    {
        let win=winCon[i];
        let s1=win[0];
        let s2=win[1];
        let s3=win[2];

        if(square[s1]!=null &&square[s1]===square[s2] && square[s2]===square[s3])
        {
            console.log("winner "+square[s1]);
            return square[s1];
        }
    }
    return null;
}
class Board extends React.Component {
    handleBoxclick(i) {
        this.props.handleclick(i);
    }
    renderButton(i) {
        return (<button onClick={() => this.handleBoxclick(i)}>{this.props.boxes == null ? "" : this.props.boxes[i]}</button>);
    }
    render() {
        return (
            <div className='board'>
                <div className='title'>Tic-Tac-Toe</div>
                <div className='content'>
                    <div className='ttt'>
                        <div className='row'>
                            {this.renderButton(0)};
                            {this.renderButton(1)};
                            {this.renderButton(2)};

                        </div>
                        <div className='row'>
                            {this.renderButton(3)};
                            {this.renderButton(4)};
                            {this.renderButton(5)};
                        </div>
                        <div className='row'>
                            {this.renderButton(6)};
                            {this.renderButton(7)};
                            {this.renderButton(8)};
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Display extends React.Component {
    handle(i)
    {
        this.props.handleForHistory(i)
    }
    render() {
        let gametitle = null;
        // console.log(this.props.gameStatus + " " + this.props.stepNumber);

        if (this.props.gameStatus === null) {
            gametitle = "Next move for "+(this.props.stepNumber % 2===0 ?"X" :"O");
        } else {
            if (this.props.gameStatus==="draw") {
                gametitle = "Its a Draw";
            }
            else {
                gametitle = this.props.gameStatus+" is Winner";

            }
        }

        let buttons = [];
        for (let i = 0; i <= this.props.stepNumber; i++) {
            let button = null;
            if (i === 0) {
                button = (<button key={i} onClick={()=>this.handle(i)}>  GO to start</button>)
            }
            else {
                button = (<button key={i} onClick={()=>this.handle(i)}> GO to Step {i}</button>)
            }
            buttons.push(button);
        }
        return (
            <div className='display'>
                <div className='title'>{gametitle}</div>
                <div className='content'>
                    <div className='history'>
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}
class TTT extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                [null, null, null, null, null, null, null, null, null]
            ],
            stepNumber: 0,
            gameStatus: null,
        }
    }
    handleClickByUser(i) {
        let oldhist = this.state.history.slice();
        let lastStateofSquare = oldhist[oldhist.length - 1].slice();
        if (lastStateofSquare[i] != null || this.state.gameStatus!=null) {
            return;
        }
        // let winner=getwinner(lastStateofSquare);
        lastStateofSquare[i] = this.state.stepNumber % 2 === 0 ? 'X' : 'O';
        oldhist.push(lastStateofSquare);

        let winner=getwinner(lastStateofSquare);
        if(this.state.stepNumber===8 && winner===null)
        {
            winner="draw";
        }

        this.setState({
            history: oldhist,
            stepNumber: this.state.stepNumber + 1,
            gameStatus: winner,
        });
    }
    movetoStep(i)
    {
        let oldhist=this.state.history.slice(0,i+1);
        let lastStateofSquare = oldhist[oldhist.length - 1];

        let winner=getwinner(lastStateofSquare);

        this.setState({
            history:oldhist,
            stepNumber:i,
            gameStatus:winner,
        })
    }
    render() {
        let squareitem = this.state.history[this.state.history.length - 1];
        return (
            <>
                <Board handleclick={(i) => this.handleClickByUser(i)} boxes={squareitem} />
                <Display stepNumber={this.state.stepNumber} gameStatus={this.state.gameStatus} handleForHistory={(i)=>{this.movetoStep(i)}} />
            </>
        )
    }
}

ReactDOM.render(<TTT />, document.getElementById("root"))

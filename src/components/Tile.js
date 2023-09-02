import React from 'react';

class Tile extends React.Component {
    render() {
        return (
            <button 
                onMouseDown={() => this.props.start(this.props.letter)}
                onMouseEnter={() => this.props.write(this.props.letter)}
                onMouseUp={this.props.delete}
                className={"tile " + this.props.theme}
            >
                {this.props.letter}
            </button>
        );
    }
}

export {Tile}
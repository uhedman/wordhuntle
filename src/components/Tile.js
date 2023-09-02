import React from 'react';

class Tile extends React.Component {
    render() {
        return (
            <button 
                onClick={() => this.props.write(this.props.letter)}
                className={"tile " + this.props.theme}
            >
                {this.props.letter}
            </button>
        );
    }
}

export {Tile}
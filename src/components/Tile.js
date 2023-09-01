import React from 'react';

class Tile extends React.Component {
    render() {
        return (
            <button 
                onClick={() => this.props.write('A')}
                className={"tile " + this.props.theme}
            >
                A
            </button>
        );
    }
}

export {Tile}
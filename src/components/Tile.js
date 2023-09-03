import React from 'react';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.delete = this.delete.bind(this);
    }

    onMouseDown() {
        this.setState((state) => {
            if (!state.selected) {
                this.props.start(this.props.letter, this.delete);
            }
            return { selected: true };
        });
    }

    onMouseEnter() {
        if (this.props.drag) {
            this.setState((state) => {
                if (!state.selected) {
                    this.props.write(this.props.letter, this.delete);
                }
                return { selected: true };
            });
        }
    }

    delete() {
        this.setState({
            selected: false
        });
    }

    render() {
        return (
            <button 
                onMouseDown={this.onMouseDown}
                onMouseEnter={this.onMouseEnter}
                className={"tile " + this.props.theme}
            >
                {this.props.letter}
            </button>
        );
    }
}

export {Tile}
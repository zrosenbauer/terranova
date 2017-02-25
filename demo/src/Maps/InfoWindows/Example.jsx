import React, { Component } from 'react';

const style = {
  background: '#fff',
  padding: '20px 30px',
  fontSize: '16px',
  width: '400px'
};

const buttonStyles = {
  padding: '12px 16px',
  color: '#fff',
  backgroundColor: '#c33',
  border: '1px solid #eee',
  cursor: 'pointer',
};

/**
 * Example Infowindow Component
 * @module components/Areas/Maps/Infowindows/Area
 * @param {Object} props
 * @returns {React.Component}
 */
export default class Example extends Component {

  static displayName = 'Maps/InfoWindows/Example';

  state = {
    counter: 0,
  };

  constructor(props) {
    super(props);

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.clearCounter = this.clearCounter.bind(this);
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1,
    });
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1,
    });
  }

  clearCounter() {
    this.setState({
      counter: 0,
    });
  }

  render() {
    const { counter } = this.state;

    return (
      <div className="example-infowindow-component" style={style}>
        <h1>{this.props.name}</h1>
        <hr />
        <h4>Properties</h4>
        <ul>
          {(() => {
            const result = [];
            for (let k in this.props) {
              if (k !== 'name') {
                result.push(this.props[k]);
              }
            }

            return result.map((v) => (
              <li key={v}>{v}</li>
            ));
          })()}
        </ul>

        <p>
          React based counter value: {counter}
        </p>
        <button onClick={this.increment} style={buttonStyles}>
          +1
        </button>
        <button onClick={this.decrement} style={buttonStyles}>
          -1
        </button>
        <button onClick={this.clearCounter} style={buttonStyles}>
          Clear
        </button>
      </div>
    );
  }
}

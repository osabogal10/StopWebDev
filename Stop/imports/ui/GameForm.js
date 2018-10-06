import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import OtrosJugadores from './OtrosJugadores';

class GameForm extends Component {
  constructor(props){
    super(props);

    this.state={
      Nombre: '',
      Ciudad: '',
      Color: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }

  handleStop(){
    let stop = {
      Nombre: this.state.Nombre,
      Ciudad: this.state.Ciudad,
      Color: this.state.Color,
    };
    console.log(stop);

    Meteor.call('juegos.addJugada', stop);
  }

  render() {
    return(<div>
      {Meteor.user() ? 
        <div>
          <table>
            <tbody>
              <tr>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Color</th>
              </tr>
              <tr>
                <th><input value={this.state.Nombre} onChange={this.handleChange} name='Nombre' type="text"/></th>
                <th><input value={this.state.Ciudad} onChange={this.handleChange} name='Ciudad' type="text"/></th>
                <th><input value={this.state.Color} onChange={this.handleChange} name='Color' type="text"/></th>
                <th><button onClick={this.handleStop}>STOP!</button></th>
              </tr>
              <OtrosJugadores/>
            </tbody>
          </table>
        </div>
        
        : 
        <h1>Inicie sesion para jugar</h1>
      }
    </div>);
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(GameForm);
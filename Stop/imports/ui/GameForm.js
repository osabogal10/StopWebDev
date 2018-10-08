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
      user: this.props.user.username,
      roomId:this.props.user.roomId,
      nombre: {word:this.state.Nombre,score:0},
      ciudad: {word:this.state.Ciudad,score:0},
      color: {word:this.state.Color,score:0},
      puntos: 0
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
                <th><input onBlur={this.handleStop} autoFocus value={this.state.Nombre} onChange={this.handleChange} name='Nombre' type="text"/></th>
                <th><input onBlur={this.handleStop} value={this.state.Ciudad} onChange={this.handleChange} name='Ciudad' type="text"/></th>
                <th><input onBlur={this.handleStop} value={this.state.Color} onChange={this.handleChange} name='Color' type="text"/></th>
                <th><button onFocus={this.handleStop} onClick={this.handleStop}>STOP!</button></th>
              </tr>
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
  Meteor.subscribe('juegos');
  return {
    user: Meteor.user()
  };
})(GameForm);
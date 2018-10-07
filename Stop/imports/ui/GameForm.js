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
      User: this.props.user.username,
      Nombre: [this.state.Nombre,0],
      Ciudad: [this.state.Ciudad,0],
      Color: [this.state.Color,0],
      Puntos: 0
    };
    console.log(stop);

    Meteor.call('rooms.addPlay', stop,this.props.user.roomId);
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
  return {
    user: Meteor.user()
  };
})(GameForm);
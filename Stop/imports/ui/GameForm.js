import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';
import OtrosJugadores from './OtrosJugadores';
import {Table, Button, Input} from 'reactstrap';
import { Rooms } from '../api/rooms';

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

  renderOtrosJugadores(){
    if(this.props.room.state == 'Listo'){
      return(
        <Table>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Color</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{this.props.user.username}</th>
              <th><Input onBlur={this.handleStop} autoFocus value={this.state.Nombre} onChange={this.handleChange} name='Nombre' type="text"/></th>
              <th><Input onBlur={this.handleStop} value={this.state.Ciudad} onChange={this.handleChange} name='Ciudad' type="text"/></th>
              <th><Input onBlur={this.handleStop} value={this.state.Color} onChange={this.handleChange} name='Color' type="text"/></th>
              <th><Button color='danger' onFocus={this.handleStop} onClick={this.handleStop}>STOP!</Button></th>
            </tr>
          </tbody>
        </Table>
      );
    }
    else{
      return(
        <Table>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Color</th>
              <th>Puntos</th>
            </tr>
          </thead>
        </Table>
      );
    }
  }

  render() {
    return(<div>
      {Meteor.user() ? 
        this.renderOtrosJugadores(): 
        <h1>Inicie sesion para jugar</h1>
      }
    </div>);
  }
}

export default withTracker(() => {
  Meteor.subscribe('juegos');
  Meteor.subscribe('rooms');
  let user = Meteor.user();
  return {
    user: Meteor.user(),
    room: Rooms.findOne({_id:user.roomId},{})
  };
})(GameForm);
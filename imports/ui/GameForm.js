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
      Apellido: '',
      Ciudad: '',
      Fruta: '',
      Color: '',
      Comida:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateStop = this.updateStop.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleChange(event) {
    // Usar destructuración de objetos
    // const value = event.target.value;
    const { value } = event.target;
    this.setState({
      [event.target.name]: value
    });
  }

  // Usar destructuración de objetos  
  updateStop(){
    if(this.props.room.state == 'Listo')
    {
      const { username: user, roomId } = this.props.user;
      const { Nombre: nombre,
              Apellido: apellido,
              Ciudad: ciudad,
              Fruta: fruta,
              Color: color,
              Comida: comida,
             } = this.state;
      let stop = {
        user,
        roomId,
        nombre: {word:nombre,score:0},
        apellido: {word:apellido,score:0},
        ciudad: {word:ciudad,score:0},
        fruta: {word:fruta,score:0},
        color: {word:color,score:0},
        comida: {word:comida,score:0},
        puntos: 0
      };
      console.log(stop);
      
      Meteor.call('juegos.addJugada', stop);
    }
  }

  handleStop(){
    let estado = 'Stop';
    Meteor.call('rooms.changeState',estado,this.props.user.roomId);
  }

  renderOtrosJugadores(){
    if(this.props.room.state == 'Listo'){
      return(
        <Table>
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Pais/Ciudad</th>
              <th>Fruta</th>
              <th>Color</th>
              <th>Comida</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{this.props.user.username}</th>
              <th><Input onBlur={this.updateStop} autoFocus value={this.state.Nombre} onChange={this.handleChange} name='Nombre' type="text"/></th>
              <th><Input onBlur={this.updateStop} value={this.state.Apellido} onChange={this.handleChange} name='Apellido' type="text"/></th>
              <th><Input onBlur={this.updateStop} value={this.state.Ciudad} onChange={this.handleChange} name='Ciudad' type="text"/></th>
              <th><Input onBlur={this.updateStop} value={this.state.Fruta} onChange={this.handleChange} name='Fruta' type="text"/></th>
              <th><Input onBlur={this.updateStop} value={this.state.Color} onChange={this.handleChange} name='Color' type="text"/></th>
              <th><Input onBlur={this.updateStop} value={this.state.Comida} onChange={this.handleChange} name='Comida' type="text"/></th>
              <th><Button color='danger' onFocus={this.handleStop} onClick={this.updateStop}>STOP!</Button></th>
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
              <th>Apellido</th>
              <th>Pais/Ciudad</th>
              <th>Fruta</th>
              <th>Color</th>
              <th>Comida</th>
              <th>Puntos</th>
            </tr>
          </thead>
        </Table>
      );
    }
  }

  render() {
    return(
      Meteor.user() ? 
        this.renderOtrosJugadores(): 
        <h1>Inicie sesion para jugar</h1>
    );
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

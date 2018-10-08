import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Juegos } from '../api/juegos';
import { Rooms } from '../api/rooms';
import {Button, Input} from 'reactstrap';

class OtrosJugadores extends Component {
  constructor(props){
    super(props);

    this.handleVotos = this.handleVotos.bind(this);
  }

  handleVotos(e){
    console.log(e.target.name,e.target.checked);
    let pUser = e.target.name.split(';')[0];
    let field = e.target.name.split(';')[1];
    let vote = e.target.checked;
    Meteor.call('juegos.votar',pUser,field,vote);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }
  
  renderConVotaciones(){
    return this.props.juegos.map((r,i) => {
      return(
        <tr key={i}>
          <td>{r.user}</td>
          <td>
            <div>
              <Input type="checkbox" onChange={(e) => this.handleVotos(e)} name={r.user+';nombre'} checked={(r.user+';nombre').value} />
              <label>{r.nombre.word}   {r.nombre.score}</label>
            </div>
          </td>
          <td><div>
            <Input type="checkbox" onChange={(e) => this.handleVotos(e)} name={r.user+';apellido'} checked={(r.user+';apellido').value} />
            <label>{r.apellido.word}   {r.apellido.score}</label>
          </div></td>
          <td><div>
            <Input type="checkbox" onChange={(e) => this.handleVotos(e)} name={r.user+';ciudad'} checked={(r.user+';ciudad').value} />
            <label>{r.ciudad.word}   {r.ciudad.score}</label>
          </div></td>
          <td><div>
            <Input type="checkbox" onChange={(e) => this.handleVotos(e)} name={r.user+';fruta'} checked={(r.user+';fruta').value} />
            <label>{r.fruta.word}   {r.fruta.score}</label>
          </div></td>
          <td><div>
            <Input type="checkbox" onChange={(e) => this.handleVotos(e)} name={r.user+';color'} checked={(r.user+';color').value} />
            <label>{r.color.word}   {r.color.score}</label>
          </div></td>
          <td><div>
            <Input type="checkbox" onChange={(e) => this.handleVotos(e)} name={r.user+';comida'} checked={(r.user+';comida').value} />
            <label>{r.comida.word}   {r.comida.score}</label>
          </div></td>
          <td>{r.puntos}</td>
        </tr>
      );
    });
  }
  
  renderOtrosJuegos(){
    return this.props.juegos.map((r,i) => {
      return(
        <tr key={i}>
          <td>{r.user}</td>
          <td>{r.nombre.word}</td>
          <td>{r.apellido.word}</td>
          <td>{r.ciudad.word}</td>
          <td>{r.fruta.word}</td>
          <td>{r.color.word}</td>
          <td>{r.comida.word}</td>
          <td>{r.puntos}</td>
        </tr>
      );
    });
  }

  render() {
    console.log('juegos',this.props.juegos);
    if(this.props.room.state == 'Votaciones')
    {
      return this.renderConVotaciones();
    }
    return this.renderOtrosJuegos();
  }
}

OtrosJugadores.propTypes ={
  juegos: PropTypes.array
};

export default withTracker(() => {
  Meteor.subscribe('juegos');
  Meteor.subscribe('rooms');
  let user=Meteor.user();
  return{
    juegos: Juegos.find({roomId:user.roomId}).fetch(),
    room: Rooms.findOne({_id:user.roomId},{})
  };
})(OtrosJugadores);
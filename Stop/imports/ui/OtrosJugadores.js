import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Juegos } from '../api/juegos';

class OtrosJugadores extends Component {
  
  renderOtrosJuegos(){
    return this.props.juegos.map((r,i) => {
      return(
        <tr key={i}>
          <td>{r.nombre.word}</td>
          <td>{r.ciudad.word}</td>
          <td>{r.color.word}</td>
        </tr>
      );
    });
  }
  
  render() {
    console.log('juegos',this.props.juegos);
    return this.renderOtrosJuegos();
  }
}

OtrosJugadores.propTypes ={
  juegos: PropTypes.array
};

export default withTracker(() => {
  Meteor.subscribe('juegos');
  let user=Meteor.user();
  return{
    juegos: Juegos.find({roomId:user.roomId}).fetch()
  };
})(OtrosJugadores);
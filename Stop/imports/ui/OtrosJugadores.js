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
          <td>{r.Nombre}</td>
          <td>{r.Ciudad}</td>
          <td>{r.Color}</td>
        </tr>
      );
    });
  }
  
  render() {
    return this.props.juegos.map((r,i) => {
      return(
        <tr key={i}>
          <td>{r.Nombre}</td>
          <td>{r.Ciudad}</td>
          <td>{r.Color}</td>
        </tr>
      );
    });
  }
}

OtrosJugadores.propTypes ={
  juegos: PropTypes.array
};

export default withTracker(() => {
  Meteor.subscribe('juegos');
  return{
    juegos: Juegos.find({}).fetch()
  };
})(OtrosJugadores);
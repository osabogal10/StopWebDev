import React, { Component } from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Rooms } from '../api/rooms';

class OtrosJugadores extends Component {
  
  renderOtrosJuegos(){
    return this.props.room.plays.map((r,i) => {
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
    console.log(this.props.room);
    if(this.props.room!=undefined){
      return this.props.room.plays.map((r,i) => {
        return(
          <tr key={i}>
            <td>{r.user}</td>
          </tr>
        );
      });
    }
    else{
      return(<div></div>);
    }
  }
}

OtrosJugadores.propTypes ={
  room: PropTypes.object
};

export default withTracker(() => {
  Meteor.subscribe('rooms');
  let user = Meteor.user();
  return{
    room: Rooms.findOne({_id:user.roomId})
  };
})(OtrosJugadores);
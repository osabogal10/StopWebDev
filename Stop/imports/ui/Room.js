import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col} from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import GameForm from './GameForm';
import OtrosJugadores from './OtrosJugadores';
import {withTracker} from 'meteor/react-meteor-data';
import { Rooms } from '../api/rooms';

class Room extends Component {
  constructor(props){
    super(props);
  }
  
  
  render() {
    if(this.props.room!=undefined)
    {
      return (
        <div>
          <Container>
            <Row>
              <h1>Sala - {this.props.room._id}</h1>
              <h2>Letra: {this.props.room.letra}</h2>
            </Row>
            <Row>
              <GameForm user={this.props.user}/>
            </Row>
            <Row>
              <table>
                <tbody>
                  <OtrosJugadores user={this.props.user}/>
                </tbody>
              </table>
            </Row>
          </Container>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }
}

export default withTracker(() => {
  Meteor.subscribe('rooms');
  let user = Meteor.user();
  return {
    room:Rooms.findOne({_id:user.roomId},{})
  };
})(Room);
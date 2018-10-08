import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col, Table, Button} from 'reactstrap';
import { Meteor } from 'meteor/meteor';
import GameForm from './GameForm';
import OtrosJugadores from './OtrosJugadores';
import {withTracker} from 'meteor/react-meteor-data';
import { Rooms } from '../api/rooms';

class Room extends Component {
  constructor(props){
    super(props);

    this.handleStart = this.handleStart.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleStart(){
    let estado = 'Listo';
    Meteor.call('rooms.changeState',estado,this.props.user.roomId);
  }

  handleReset(){
    let estado = 'Esperando jugadores';
    Meteor.call('rooms.changeState',estado,this.props.user.roomId);
  }
  
  renderAdminRoom(){
    if(this.props.user.username == this.props.room.owner)
    {
      if(this.props.room.state == 'Esperando jugadores')
      {
        return(
          <Col>
            <Button color='success' onClick={this.handleStart}>Iniciar</Button>  
          </Col>
        );
      }
    }
  }

  render() {
    if(this.props.room!=undefined)
    {
      return (
        <div>
          <Container>
            <Row>
              <h1>Sala - {this.props.room._id}</h1>
              <Button onClick={this.handleReset}>Reset</Button>
            </Row>
            <Row>
              <h2>Letra: {this.props.room.letra}</h2>
            </Row>
            <Row>
              <Col>
                <h3>Estado: {this.props.room.state}</h3>
              </Col>
              {this.renderAdminRoom()}
            </Row>
          </Container>
          <Container>
            <Row>
              <GameForm user={this.props.user}/>
            </Row>
            <Row>
              <Table>
                <tbody>
                  <OtrosJugadores user={this.props.user}/>
                </tbody>
              </Table>
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
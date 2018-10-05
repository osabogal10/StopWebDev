import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";

import CreateGame from "./CreateGame.js";
import JoinGame from "./JoinGame.js";

export default class CJGame extends Component
{
    constructor(props) 
    {
        super(props);
    
        this.state = 
        {
          gameId: null,
          gameIdJoin: "",
          hostId: null,
          host: null,
          ready: false,
          players:[]
        };
    
        this.handleCreate = this.handleCreate.bind(this);
		this.handleGameIdJoinChange = this.handleGameIdJoinChange.bind(this);
		this.handleJoin = this.handleJoin.bind(this);
    }

    handleCreate()
    {
        Meteor.call('games.create', (err,res) => 
        {
            this.setState({
              gameId:res.gameId,
              hostId:res.hostId,
              host:res.gameIdhost,
              ready:res.ready,
              players:res.players,
            });
        });
    }

    handleGameIdJoinChange(e)
    {
        let gameIdJoin = e.target.value;
        this.setState(gameIdJoin);
    }

    handleJoin(e)
    {
        let gameIdJoin = this.state.gameIdJoin;
        //Meteor.call()     
        //Teoricamente es tomar el juego del gameIdJoin para insertarle el nuevo jugador
    }
    render()
    {
        return (
            <div className ="cjGame">
            <h2>Soy un pobre texto que sirve de titulo</h2>
            
            <div id="gridRow" className="row"> 
            <CreateGame
            handleCreate={this.handleCreate}
            />
            <JoinGame
            handleJoin={this.handleJoin}
            gameIdJoin={this.state.gameIdJoin}
            handleGameIdJoinChange={this.handleGameIdJoinChange}
            />
            </div></div>

        );
    }
}
import React, { Component } from 'react';
 export default class CreateGame extends Component
{
	render(){
		return (
			<div className="createGame">
			
			<h2>Create a Game</h2>
			<h4> Everything is ready to start, please press the button below</h4>
			<br/><button 
			id="cgbutton"
			className="btn btn-primary"
			type="button"
			title="Create a game"
			onClick={this.props.handleCreate}>Create a Game
		    </button>
 		    </div>
			);
	}
} 
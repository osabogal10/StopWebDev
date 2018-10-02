import React, { Component } from 'react';

export default class JoinGame extends Component
{
	render(){
		return (
			<div className = "joinGame">

			<h2>Join a Game</h2>
			<form onSubmit={this.props.handleJoin}>
					<label>
						Enter the game ID:{" "}
						<input
							autoFocus
							type="text"
							value={this.props.gameIdJoin}
							onChange={this.props.handleGameIdJoinChange} />
					</label>
			</form>

			</div>
			);
	}
}
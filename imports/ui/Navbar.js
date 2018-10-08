import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import {withTracker} from 'meteor/react-meteor-data';

import AccountsUIWrapper from './AccountsUIWrapper.js';

export class Navbar extends Component
{
    render(){
        
        return (
            <div className="navbar">
            {Meteor.user() ?
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                <ul className="navbar-nav">
                <li className="nav-item active">
                <a className="nav-link" href="/">Welcome to the STOP Online Game - Web Development Uniandes<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                <a className="nav-link">Logged In! Welcome:  </a>
                </li>
                </ul>
                <AccountsUIWrapper/>
                </div>
                </nav>
                :
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                <ul className="navbar-nav">
                <li className="nav-item active">
                <a className="nav-link">Welcome to the STOP Online Game - Web Development Uniandes<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                <a className="nav-link">Need to log to start playing</a>
                </li>
                </ul>
                </div>
                </nav>
            }
            
            </div>
			);
        }
    }
    
    Navbar.propTypes = {
        user: PropTypes.object
    };
    
    export default withTracker(() => 
    {  
        return {
            user: Meteor.user()
        };
    })(Navbar);
    
    {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
    <ul className="navbar-nav">
    <li className="nav-item">
    <a className="nav-link" href="/">Orlando Sabogal Rojas</a>
    </li>
    <li className="nav-item">
    <a className="nav-link" href="/"></a>
    </li>
    <li className="nav-item active">
    <a className="nav-link" href="/">Welcome to the STOP Online Game - Web Development Uniandes<span className="sr-only">(current)</span></a>
    </li>
    <li className="nav-item">
    <a className="nav-link" href="/"></a>
    </li>
    <li className="nav-item">
    <a className="nav-link" href="/">Daniel Cagua Ennis</a>
    </li>
    </ul>
    </div>
    </nav> */}
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
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                <ul class="navbar-nav">
                <li class="nav-item active">
                <a class="nav-link" href="/">Welcome to the STOP Online Game - Web Development Uniandes<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                <a class="nav-link">Logged In! Welcome:  </a>
                </li>
                </ul>
                <AccountsUIWrapper/>
                </div>
                </nav>
                :
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                <ul class="navbar-nav">
                <li class="nav-item active">
                <a class="nav-link">Welcome to the STOP Online Game - Web Development Uniandes<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                <a class="nav-link">Need to log to start playing</a>
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
    
    {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
    <ul class="navbar-nav">
    <li class="nav-item">
    <a class="nav-link" href="/">Orlando Sabogal Rojas</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="/"></a>
    </li>
    <li class="nav-item active">
    <a class="nav-link" href="/">Welcome to the STOP Online Game - Web Development Uniandes<span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="/"></a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="/">Daniel Cagua Ennis</a>
    </li>
    </ul>
    </div>
    </nav> */}
import React, { Component } from "react";

import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAs2vCoDKeW6KB7HFCImjt_iE30fjppwxY",
  authDomain: "bloc-chat-303a5.firebaseapp.com",
  databaseURL: "https://bloc-chat-303a5.firebaseio.com",
  projectId: "bloc-chat-303a5",
  storageBucket: "bloc-chat-303a5.appspot.com",
  messagingSenderId: "811035312936"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: ""
    };
  }

  // handleRoomClick method
  handleRoomClick(theRoom, e) {
    if (e) e.preventDefault();
    console.log(`${theRoom} was clicked!`);
  }

  render() {
    return (
      <div>
        <div className="App">
          <RoomList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            handleRoomClick={(theRoom, e) => this.handleRoomClick(theRoom, e)}
          />
        </div>
        <div className="active-room">
          <h1>Active room:</h1>
        </div>
        <div className="message-list">
          <h3>MESSAGE LIST:</h3>
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
        </div>
      </div>
    );
  }
} // constructor

export default App;

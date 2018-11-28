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
      activeRoomName: "",
      activeRoomId: ""
    };
  } // constructor


  // handleRoomClick method
  handleRoomClick(theRoom, theRoomId, e) {
    if (e) e.preventDefault();
    this.setState({
      activeRoomName: `${theRoom}`,
      activeRoomId: `${theRoomId}`
    });
  }


  render() {
    return (
      <div>
        <div className="App">
          <RoomList
            firebase={firebase}
            activeRoomName={this.state.activeRoomName}
            handleRoomClick={(theRoom, theRoomId, e) => this.handleRoomClick(theRoom, theRoomId, e)}
          />
        </div>
        <div className="active-room">
          <h1>Active room: {this.state.activeRoomName}</h1>
        </div>
        <div className="message-list">
          <MessageList
            firebase={firebase}
            activeRoomId={this.state.activeRoomId}
          />
        </div>
      </div>
    );
  }
} // constructor

export default App;

import React, { Component } from "react";

import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";
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
      activeRoomName: "room1",
      activeRoomId: "1:",
      user: "Guest"
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


  // setUser method
  handleSetUser(user) {

    //console.log(`Inside handleSetUser --> User name: ${userName}`);

    if (user === null) {
      this.setState({
        user: "Guest"
      })
    } else {
      const userName = user.displayName;

      this.setState({
        user: `${userName}`
      })
    }
  }


  // // handleSendMessage method
  // handleSendMessage(newMessage, e) {
  //   if (e) e.preventDefault();

  //   console.log(`A new message was sent by ${this.state.user}!`);
  // }


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
          <h3>Active room: {this.state.activeRoomName}</h3>
          <h3>Username: {this.state.user}</h3>
        </div>
        <div className="message-list">
          <MessageList
            firebase={firebase}
            activeRoomId={this.state.activeRoomId}
            username={this.state.user}
          />
        </div>
        <div>
          <User
            firebase={firebase}
            setUser={user => this.handleSetUser(user)}
          />
        </div>

      </div>
    );
  }
} // constructor

export default App;

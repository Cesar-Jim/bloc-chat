import React, { Component } from 'react';

import RoomList from './components/RoomList';
import * as firebase from 'firebase';

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

  render() {
    return (
      <div className="App">
        <RoomList firebase = { firebase } />
      </div>
    );
  }

} // constructor

export default App;

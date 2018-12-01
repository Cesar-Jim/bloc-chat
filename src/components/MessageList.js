import React, { Component } from "react";

import * as firebase from "firebase";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: {
        content: '',
        roomId: '',
        createdAt: '',
        username: ''
      }
    };

    this.messagesRef = this.props.firebase.database().ref("Messages");   // firebase reference
  } // constructor


  // componentDidMount method
  componentDidMount() {
    this.setupMessageRef();
  }


  componentWillUnmount() {
    this.emptyMessages();
  }



  // setUpMessageRef method
  setupMessageRef = () => {
    if (this.props.activeRoomId) {
      this.messagesRef.orderByChild("roomId").equalTo(this.props.activeRoomId).on("child_added", snapshot => {

        const message = snapshot.val();

        message.key = snapshot.key;
        this.setState({
          messages: this.state.messages.concat(message)
        });
      });
      console.log(this.state.messages);
    }

  }


  // componentDidUpdate method
  componentDidUpdate(prevProps) {

    if (prevProps.activeRoomId !== this.props.activeRoomId) {
      this.emptyMessages();
      this.setupMessageRef();
    }
  }


  // emptyMessages method
  emptyMessages = () => {

    this.setState({
      messages: []
    })
  }


  // createMessage method
  createMessage(roomId, user, message, e) {
    if (e) e.preventDefault();

    if (message === "") {
      console.log('Please type in a message!');
    } else {

      ///////////// MESSAGE CREATION /////////////
      this.setState({
        message: {
          content: message,
          roomId: roomId,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          username: user
        }
      })

      console.log(this.state.message);

      ///////////// PUSH NEW MESSAGE INTO MESSAGE LIST ARRAY /////////////
      const newMessage = this.state.message;

      this.messagesRef.push(newMessage);
      this.refs.newMessage.value = "";   // clear the input field after a message was sent.
    }
    this.componentDidUpdate();
  }

  render() {
    return (
      <div>
        <h3>-Messages-</h3>
        {this.state.messages.map((message, index) => (
          <div className="list-of-messages" key={index}>
            <p><strong>{message.username}</strong></p>
            <p>{message.content}</p>
            <p>{message.createdAt}</p>
            <p>----------------------</p>
          </div>
        ))}
        <div>
          <form className="send-message-form"
            onSubmit={(e) => this.createMessage(
              this.props.activeRoomId,
              this.props.username,
              this.refs.newMessage.value,
              e
            )}
          >
            <fieldset>
              <legend>Send a new message:</legend>
              <input placeholder="type your message here..." ref="newMessage" />
              <input type="submit" value="Send" />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;

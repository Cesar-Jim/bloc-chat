import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("Messages");
  } // constructor


  // componentDidMount method
  componentDidMount() {
    this.setupMessageRef();
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
    }

  }


  render() {
    return (
      <div>
        <h3>-Messages-</h3>
        {this.state.messages.map((message, index) => (
          <div className="list-of-messages" key={index.toString()}>
            <p>By: {message.username}</p>
            <p>Message: {message.content}</p>
            <p>Time: {message.sentAt}</p>
            <p>----------------------</p>
          </div>
        ))}
      </div>
    );
  }
}

export default MessageList;

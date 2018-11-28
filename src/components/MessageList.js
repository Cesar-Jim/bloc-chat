import React, { Component } from "react";

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref("Messages"); // firebase reference
  } // constructor

  // componentDidMount method
  componentDidMount() {
    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();

      message.key = snapshot.key;
      this.setState({}); //THIS PART IS PENDING!!!!
    });
  }

  render() {
    return (
      <div>
        <p>Here goes message list</p>
      </div>
    );
  }
} // class

export default MessageList;

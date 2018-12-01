import React, { Component } from "react";

<<<<<<< HEAD
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
=======
import * as firebase from 'firebase';

class MessageList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         messages: [],
         newMessage: false,
         message: {
            content: null,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            roomId: null,
            username: null
         }
      };

      this.messagesRef = this.props.firebase.database().ref("Messages");   // firebase reference to messages
   } // constructor


   // componentDidMount lifecycle method
   componentDidMount() {
      this.messagesRef.on("child_added", snapshot => {
         const message = snapshot.val();

         message.key = snapshot.key;
         this.setState({
            messages: this.state.messages.concat(message)
         });
      });
   }


   // componentDidUpdate lifecycle method
   componentDidUpdate() {

      if (this.state.newMessage) {
         // console.log(prevProps);
         // console.log(`User: ${this.props.user} / Message: ${this.state.message.content} / RoomID: ${this.props.activeRoomId} / CreatedAt: ${this.state.message.createdAt}`);

         const formattedTime = this.state.message.createdAt;
         console.log(formattedTime.toJ);

         this.messagesRef.push(this.state.message);

         this.setState({
            newMessage: false
         })
      }

   }


   // handleMessageCreation method
   handleMessageCreation(e, message, activeRoomId, user) {
      if (e) e.preventDefault();

      if (message !== "") {

         this.setState({
            newMessage: true,
            message: {
               content: message,
               roomId: activeRoomId,
               username: user,
               createdAt: firebase.database.ServerValue.TIMESTAMP,
            }
         });

         this.refs.newMessage.value = "";
      }
   }


   render() {
      return (
         <div>
            <div className="message-list">
               <br />
               <p>MESSAGES:</p>
               {this.state.messages.filter((message) => {
                  return (this.props.activeRoomId === message.roomId);
               }).map((message, index) =>
                  <div className="message-list" key={index}>
                     <p><strong>{message.username}</strong></p>
                     <p>{message.content}</p>
                     <p><em>Sent: {message.createdAt}</em></p>
                     <p>- - - - - - - - - - - - - - - - - - - -</p>
                  </div>
               )
               }
            </div>
            <div className="message-creation">
               <form onSubmit={e =>
                  this.handleMessageCreation(
                     e,
                     this.refs.newMessage.value,
                     this.props.activeRoomId,
                     this.props.user
                  )}
               >
                  <fieldset>
                     <legend>Send a message</legend>
                     <input placeholder="write your message here..." ref="newMessage" size="45" />
                     <input type="submit" value="Send" />
                  </fieldset>
                  <br />
                  <br />
               </form>
            </div >
         </div >
      );
   }
>>>>>>> fix-cesar-filter-B
}

export default MessageList;

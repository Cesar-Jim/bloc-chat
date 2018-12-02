import React, { Component } from "react";

import * as firebase from 'firebase';

class MessageList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         messages: [],
         newMessage: false,
         message: {
            content: null,
            startedAt: null,
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

         // this if statement "catches" the seconds value returned by the firebase server,
         // otherwise it was impossible to retrieve that value
         if (this.state.messages && this.state.messages[0]) {
             var date = new Date(this.state.messages[0].startedAt);
             var time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

            console.log(this.state.messages[0]);
          }

          this.setState({
            newMessage: true,
            message: {
               content: message,
               roomId: activeRoomId,
               username: user,
               startedAt: `${time}`
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
                     <p><em>Sent: {message.startedAt}</em></p>
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
}

export default MessageList;

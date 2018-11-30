import React, { Component } from 'react';

class MessageSender extends Component {
   constructor(props) {
      super(props);
   }   // constructor


   render() {
      return (
         <div className="message-creation">
            <form onSubmit={
               e => this.props.handleNewMessageClick(
                  this.props.user,
                  this.props.activeRoomId,
                  this.refs.newMessage.value,
                  e)
            }
            >
               <fieldset>
                  <legend>Send a message</legend>
                  <input placeholder="Write your message here..." ref="newMessage" />
                  <button
                     className="send-message-button"
                     type="button"
                  >
                     Send
                  </button>
               </fieldset>
            </form>
         </div >
      );
   }
}
export default MessageSender;
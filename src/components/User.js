import React, { Component } from 'react';

class User extends Component {
<<<<<<< HEAD

=======
>>>>>>> fix-cesar-filter-B

   // handleSignIn method
   handleSignIn(e) {
      const provider = new this.props.firebase.auth.GoogleAuthProvider();

      this.props.firebase.auth().signInWithPopup(provider);
   }


   // handleSignOut method
   handleSignOut(e) {
      this.props.firebase.auth().signOut();
      this.componentDidMount();
   }


   componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged(user => {
         this.props.setUser(user);
      });
   }


   render() {
      return (
         <div>
            <br />
<<<<<<< HEAD
=======
            <br />
>>>>>>> fix-cesar-filter-B
            <button
               className="sign-in-button"
               type="button"
               onClick={e => this.handleSignIn(e)}
            >
               Sign In
            </button>
            <br />
            <br />
            <button
               className="sign-out-button"
               type="button"
               onClick={e => this.handleSignOut(e)}
            >
               Sign Out
            </button>
         </div>
      );
   }
}   // Class

export default User;
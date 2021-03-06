import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref("rooms"); // firebase reference
  } // constructor


  //componentDidMount method
  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();

      room.key = snapshot.key;
      this.setState({
        rooms: this.state.rooms.concat(room)
      });
    });
  }


  // createRoom method
  createRoom(e) {
    if (e) e.preventDefault();
    const newRoomName = this.refs.roomName.value;

    this.roomsRef.push({
      name: newRoomName
    });

    this.refs.roomName.value = ""; // clearing the input field after room was created.
  }


  render() {
    return (
      <div>
        <h1>Available Rooms:</h1>
        {this.state.rooms.map((room, index) => (
          <div>
            <p
              className="room-name"
              key={index}
              onClick={e => this.props.handleRoomClick(room.name, room.key, e)}
            >
              <strong>{room.name}</strong>
            </p>

          </div>
        ))}
        <div className="room-creation">
          <form onSubmit={e => this.createRoom(e)}>
            <fieldset>
              <legend>Create a new chat room:</legend>
              <input placeholder="type a new room name" ref="roomName" size="35" />
              <br />
              <br />
              <input type="submit" value="New room" />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
} // class

export default RoomList;

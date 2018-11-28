import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      name: ""
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
  }

  render() {
    return (
      <div>
        <h2>Available Rooms:</h2>
        {this.state.rooms.map((room, i) => (
          <div>
            <p
              className="room-name"
              key={i.toString()}
              onClick={e =>
                this.props.handleRoomClick(this.state.rooms.name, e)
              }
            >
              {room.name}
            </p>
          </div>
        ))}
        <div className="room-creation">
          <form onSubmit={e => this.createRoom(e)}>
            <fieldset>
              <legend>Create a new chat room:</legend>
              <input placeholder="type a new room name" ref="roomName" />
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

import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }; 

        this.roomsRef = this.props.firebase.database().ref('rooms'); // firebase reference

    } // constructor


    //componentDidMount method
    componentDidMount() {  

        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            
            room.key = snapshot.key;
            this.setState({
                rooms: this.state.rooms.concat( room )
            });

        });
        
    }


    // createRoom method
    createRoom(e) {
        if(e) e.preventDefault();
        const newRoomName = this.refs.roomName.value;
        this.roomsRef.push({
            name: newRoomName
        })
    }


    render() {
        return (
            <div>
                <h1>Available Rooms:</h1>
                {this.state.rooms.map( (room, i) => 
                <div>
                    <h4 className="room-name" key={i.toString()}>
                        {room.name}
                    </h4>
                </div>
                )}
                <div>
                    <form onSubmit={(e) => this.createRoom(e)}>
                        <fieldset>
                            <legend>Create a new chat room:</legend>
                            <input placeholder="type a new room name" ref="roomName"/>
                            <br /><br />
                            <input type="submit" value="Create Room" />
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }

} // class

export default RoomList;
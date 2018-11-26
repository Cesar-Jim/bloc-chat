import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }; 

        this.roomsRef = this.props.firebase.database().ref('rooms');

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

    render() {
        return (
            <div>
                <h1>Available Rooms:</h1>
                {this.state.rooms.map( (room, i) => 
                <div>
                    <h4 className="room-name" key={i}>
                        {(room.name).toUpperCase()}
                    </h4>
                </div>
                )}
            </div>
        );
    }

} // class

export default RoomList;
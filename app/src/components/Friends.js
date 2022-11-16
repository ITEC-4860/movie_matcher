import React, {Component} from "react";
import Button from 'react-bootstrap/Button';

function Friend(props) {
    // Friend is the actual friend data. Remove and accept are possible functions passed into the Friend object for use in the buttons
    const {friend, remove, accept, sendFriendRequest} = props
    return (
        <div>
            {friend.accepted ? (
                <span>
                    {friend.username}
                    <Button onClick={() => remove(friend)}>Remove</Button>
                </span>
            ) : (
                <span>
                    {friend.username}
                    <Button onClick={() => accept(friend)}>Accept</Button>
                    <Button onClick={() => remove(friend)}>Ignore</Button>
                </span>
            )}

            <span>
                <Button onClick={() => sendFriendRequest(to_user)}>Add Friend</Button>
            </span>
        </div>
    )
}

class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // TODO: This should start empty and be populated in the componentDidMount function with the result
            friends: [
                {username: 'timmy', accepted: true},
                {username: 'jimmy', accepted: true},
                {username: 'billy', accepted: false}
            ],
            isPaneOpen: true
        };

        // This needs to be bound for the functions to work properly inside the above 'friend' object
        this.addFriend = this.addFriend.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
    }

    componentDidMount() {
        if (this.props.username !== undefined) {
            // TODO: Use this.props.username to fetch user friends and requests from backend and put the data into the friends state
            fetch('http://localhost:8000/api/current_user/friends', {
                headers: {
                    Authorization: `Bearer  ${localStorage.getItem('access')}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            let friendSet = ""
                            data.friends.forEach(friend => {
                                friendSet += "{username: " + friend.username + "}, "
                            })
                            this.setState({friends: friendSet})
                        })
                    } else {
                        //  TODO: Not sure what form we're displaying here
                        this.setState({displayed_form: 'friends'})
                    }
                });
        }
    }

    sendFriendRequest() {
        // TODO: Fetch to backend to send a friend request to another user. That user should have current user added to their friends with the 'accepted' boolean false
        if () {
            fetch('http://localhost:8000/api/current_user/send_friend_request', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access')}`
                }
            })
                .then((res) => {
                    if (res.status === 200) {
                        res.json().then((data) => {

                        })
                    }
                })
        }
    }

// This should be used as a friend request acceptance tool
    addFriend(friend) {
        // TODO: Fetch to backend to add friend by username
        const accept = {
            username: friend.username,
            accepted: true
        };

        let updatedList = this.state.friends.map((e) => {
            if (e.username === friend.username) {
                return accept;
            }
            return e;
        });

        this.setState({
            friends: updatedList,
            isPaneOpen: this.state.isPaneOpen
        });
    }

    removeFriend(friend) {
        // TODO: Fetch to backend to remove friend by username
        this.setState((currentState) => {
            return {
                friends: currentState.friends.filter((listFriend) => listFriend.username !== friend.username),
                isPaneOpen: this.state.isPaneOpen
            }
        });
    }

    render() {
        const friends = this.state.friends;
        const friendRequests = [];
        const friendAccepted = [];
        friends.forEach((friend) => {
            if (friend.accepted)
                friendAccepted.push(friend);
            else
                friendRequests.push(friend);
        });

        return (
            <div>
                {friendRequests.length !== 0 ? <h2>Friend Requests</h2> : null}
                {friendRequests.map((request) => <Friend key={request.username} friend={request} remove={this.removeFriend} accept={this.addFriend}/>)}
                {friendAccepted.length !== 0 ? <h2>Friends</h2> : null}
                {friendAccepted.map((friend) => <Friend key={friend.username} friend={friend} remove={this.removeFriend}/>)}
                {friendAccepted.length === 0 && friendRequests.length === 0 ? <h2>You have no friends... Yet</h2> : null}
            </div>
        );
    }
}

export default Friends;
import React from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieCard from "./MovieCard";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            username: props.username,
            image: props.profilePic,
            favMovies: props.favMovies,
            favGenres: props.favGenres
        }
        this.state = {
            username: '',
            image: '',
            favMovies: [],
            favGenres: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("Submit Works");
    }

    componentDidMount() {
        this.updateState('username', this.props.username);
        this.updateState('image', this.props.image);
        this.updateState('favMovies', this.props.favMovies);
        this.updateState('favGenres', this.props.favGenres);
    }

    updateState = (state, value) => {
        this.setState(prevState => {
            const newState = {...prevState};
            newState[state] = value;
            return newState;
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.username !== this.props.username) {
            this.updateState('username', this.props.username);
            this.updateState('image', this.props.image);
            this.updateState('favMovies', this.props.favMovies);
            this.updateState('favGenres', this.props.favGenres);
        }
    }

    getFavoriteGenres() {
        let favDisplay = "";
        for (let i = 0; i < this.state.favGenres.length; i++) {
            favDisplay += (this.state.favGenres[i] + ", ");
        }
        return favDisplay.substring(0, favDisplay.length-2);
    }

    render() {
        return (
            <div className={"profileContainer"}>
                <div className={"row"}>
                    <img className={"profilePic"} src={this.state.image}
                         alt={"Temp Profile Pic"}></img>
                    <h1 className={"col-3"}>{this.state.username}</h1>
                </div>
                <div className={"row"}>
                    <div className={"fav"}>
                        <h2>Favorite Genres: {this.getFavoriteGenres()}</h2>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"fav"}>
                        <h2 className={"col"}>Favorites:</h2>
                        <div className={"favMovCards"}>
                            {this.state.favMovies.map((i) => {
                                return (
                                    <MovieCard query={i}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
import React from "react";
import {movieById, movieCastCrew} from "./MovieComponent";
import Popup from "reactjs-popup";
import MoviePage from "./MoviePage";

class InfiniteScrolling extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            query: props.query
        }
        this.state = {
            items: [],
            crew: [],
            genres: [],
            date: "",
            vote_avg: "",
        };
    }

    componentDidMount() {
        movieById(this.props.query).then((res) => {
            this.updateState('items', res.data);
            this.updateState('genres', res.data['genres']);
            this.updateState('date', res.data['release_date']);
            this.updateState('vote_avg', res.data['vote_average']);
        });
        movieCastCrew(this.props.query).then((res) => {
            this.updateState('crew', res.data['crew']);
        });
    }

    updateState = (state, value) => {
        this.setState(prevState => {
            const newState = {...prevState};
            newState[state] = value;
            return newState;
        });
    };

    fetchData = async () => {
        console.log('fetching data');
        const res = await movieById(this.props.query);
        const data = await res.data;
        console.log(data);
        this.updateState('items', [...this.state.items, ...data.results]);
        this.updateState('pageNumber', this.state.pageNumber + 1);
        console.log(this.state.items);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.query !== this.props.query) {
            movieById(this.props.query).then((res) => {
                this.updateState('items', res.data);
                this.updateState('genres', res.data['genres']);
                this.updateState('date', res.data['release_date']);
            });
            movieCastCrew(this.props.query).then((res) => {
                this.updateState('crew', res.data['crew']);
            });
        }
    }

    formatDate(date) {
        let monthMap = new Map([
            [1, "Jan."],
            [2, "Feb."],
            [3, "March"],
            [4, "April"],
            [5, "May"],
            [6, "June"],
            [7, "July"],
            [8, "Aug."],
            [9, "Sept."],
            [10, "Oct."],
            [11, "Nov."],
            [12, "Dec."]
        ]);
        if (parseInt(date, 5) === 0) {
            return monthMap.get(parseInt(date, 6)) + " " + date.substring(8) + ", " + date.substring(0, 4);
        } else {
            let month = date.substring(5, 7);
            return monthMap.get(parseInt(month)) + " " + date.substring(8) + ", " + date.substring(0, 4);
        }
    }

    render() {
        return (
            <div className={"MovieCardContainer"}>
                <img className={'col-sm-3'} key={this.state.items['poster_path']}
                     alt={`A poster for ${this.state.items.title}`}
                     src={`https://image.tmdb.org/t/p/w500${this.state.items['poster_path']}`}
                />
                <div className={"CardInfo"}>Rating: {this.state.vote_avg}</div>
                <div className={"CardInfo"}>Released: {this.formatDate(this.state.date)}</div>
                <Popup contentStyle={
                    {width: "40%", backgroundColor: "grey"}
                } trigger={<button> See More </button>} position={"right top"}>
                    <MoviePage query={this.state.items['id']}/>
                </Popup>
            </div>
        );
    }
}

export default InfiniteScrolling;
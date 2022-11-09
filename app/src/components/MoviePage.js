import React from "react";
import "../MoviePage.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {movieById, movieCastCrew} from "./MovieComponent";

class MoviePage extends React.Component {
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
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        alert( this.state.items.title + " was added to INSERT_LIST_TITLE_HERE");
    }

    componentDidMount() {
        movieById(this.props.query).then((res) => {
            this.updateState('items', res.data);
            this.updateState('genres', res.data['genres']);
            this.updateState('date', res.data['release_date']);
        });
        movieCastCrew(this.props.query).then((res) => {
            this.updateState('crew', res.data['crew']);
        });
    }

    updateState = (state, value) => {
        this.setState(prevState => {
            const newState = {prevState};
            newState[state] = value;
            return newState;
        });
    };

    fetchData = async () => {
        console.log('fetching data');
        const res = await movieById(this.props.query);
        const data = await res.data;
        console.log(data);
        console.log("Length: " + this.state.items.length);
        //this.updateState('items', [...this.state.items, data]);
        console.log(this.state.items);
        console.log("Contents: " + this.state.items);
    }

    solutionForTable = array => {
        const out = [];
        let inner = [];
        if (array[array.length - 1].length !== 3 && array[0].length !== 0) {
            const pile = array.pop();
            out.push(...array);
            for (let i in pile)
                inner.push(i);
        }
        for (let i in array) {
            if (inner.length === 3) {
                out.push(inner);
                inner = [];
            }
            inner.push(i);
        }
        if (inner.length !== 0)
            out.push(inner);
        return out;
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

    getDirector() {
        let crew = this.state.crew;
        let director = crew.map((i) => {
            let name = "";
            if(i['job'] === "Director"){
                name = i['name'];
            }
            return name;
        });
        return director;
    }

    getGenres(){
        let allGenres = "";
        for(let i = 0; i < this.state.genres.length; i++){
            allGenres += this.state.genres.at(i).name + ", ";
        }
        return "Genre(s): " + allGenres.substring(0, allGenres.length-2);
    }
    // 2 0 2 2 - 1 0 - 1 5
    // 0 1 2 3 4 5 6 7 8 9
    formatDate(){
        let date = this.state.date;
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
        if(parseInt(date, 5) === 0){
            return monthMap.get(parseInt(date, 6)) + " " + date.substring(8) + ", " + date.substring(0, 4);
        } else {
            let month = date.substring(5, 7);
            return monthMap.get(parseInt(month)) + " " + date.substring(8) + ", " + date.substring(0, 4);
        }
    }

    dropDown(){
        return(
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                    Dropdown
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item" type="button">Action</button>
                    </li>
                    <li>
                        <button className="dropdown-item" type="button">Another action</button>
                    </li>
                    <li>
                        <button className="dropdown-item" type="button">Something else here</button>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        void this.fetchData();
        return (
                <div>
                    <div className={'row'} key={this.state.items.id} style={{margin: 5}}>
                        <img className={'col col-sm-3'} style={{width: 180}} key={this.state.items['poster_path']}
                             alt={`A poster for ${this.state.items.title}`}
                             src={`https://image.tmdb.org/t/p/w500${this.state.items['poster_path']}`}
                        />
                        <div className={'col order-1 col-sm-7'}>
                            <h1 style={{fontWeight: "bold"}}>{this.state.items.title}</h1>
                            <h5> Released: {this.formatDate() + " | " + this.getGenres() + " | " + this.state.items['runtime'] + " Minutes"}</h5>
                            <p style={{fontSize: "135%"}}>{this.state.items['overview']}</p>
                            <h5>Director: {this.getDirector()}</h5>
                        </div>
                        <div className={'col order-2'} style={{marginTop: "1%"}}>
                            <button onClick={this.handleClick}> Add to List </button>
                            {this.dropDown()}
                        </div>
                        <br/>
                    </div>
                </div>
        );
    }
}

export default MoviePage;
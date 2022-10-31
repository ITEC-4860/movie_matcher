import React from "react";
import "../MoviePage.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import {movieById} from "./MovieComponent";

class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            query: props.query
        }
        this.state = {
            items: [],
            genres: [],
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
            });
        }
    }

    getGenres(){
        let allGenres = "";
        for(let i = 0; i < this.state.genres.length; i++){
            allGenres += this.state.genres.at(i).name + ", ";
        }
        return "Genres: " + allGenres.substring(0, allGenres.length-2);
    }

    getRuntime() {
        let runtime = this.state.items['runtime'] / 60;
        return "Runtime: ~" + runtime.toString().at(0) + " Hour(s) & " + runtime.toString().at(2) + "0 Minute(s)"
    }

    render() {
        void this.fetchData();
        return (
                <div>
                    <div className={'row'} key={this.state.items.id} style={{margin: 5}}>
                        <img className={'col col-sm-3'} key={this.state.items['poster_path']}
                             alt={`A poster for ${this.state.items.title}`}
                             src={`https://image.tmdb.org/t/p/w500${this.state.items['poster_path']}`}/>
                        <div className={'col order-1 col-sm-8'}>
                            <h1 style={{fontWeight: "bold"}}>{this.state.items.title}</h1>
                            <h6> Released: {this.state.items['release_date'] + "\n" + this.getGenres() + "\n" + this.getRuntime()}</h6>
                            <p style={{fontSize: "12pt"}}>{this.state.items['overview']}</p>
                        </div>
                        <div className={'col order-2 col-sm-8'}>
                            <button onClick={this.handleClick}> Add to List </button>
                        </div>
                        <br/>
                    </div>
                </div>
        );
    }
}

export default MoviePage;
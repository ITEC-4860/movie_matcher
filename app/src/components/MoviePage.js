import React from "react";
import "../MoviePage.css";
//import InfiniteScroll from "react-infinite-scroll-component";
import 'bootstrap/dist/css/bootstrap.min.css'

import {movieById} from "./MovieComponent";

class MoviePage extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            query: props.query
        }
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        movieById(this.props.query).then((res) => {
            this.updateState('items', res.data);
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
            });
        }
    }

    render() {
        void this.fetchData();
        return (
            <div style={{display: "flex", flexWrap: "wrap"}}>
                <div className={'row'} key={this.state.items.id} style={{margin: 5}}>
                    <img className={'col col-sm-3'} key={this.state.items['poster_path']}
                         alt={`A poster for ${this.state.items.title}`}
                         src={`https://image.tmdb.org/t/p/w500${this.state.items['poster_path']}`}/>
                    <div className={'col order-1 col-sm-7'}>
                        <h1>{this.state.items.title}</h1>
                        <h6> Released: {this.state.items['release_date']}</h6>
                        <p>{this.state.items['overview']}</p>
                    </div>
                    <br/>
                </div>
            </div>
        );
    }
}

export default MoviePage;
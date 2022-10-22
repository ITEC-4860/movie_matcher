import React from "react";
//import InfiniteScroll from "react-infinite-scroll-component";

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

    /**
     * Changes: removed the '.results' from data in updateState
     */
    fetchData = async () => {
        console.log('fetching data');
        const res = await movieById(this.props.query);
        const data = await res.data;
        console.log(data);
        this.updateState('items', [this.state.items, data]);
        console.log(this.state.items);
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

    /**
     * Note: Info from TMDB can be pulled from API, however displaying is inconsistent.
     */
    render() {
        void this.fetchData();
        return (
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {this.state.items.map((i) => {
                        console.log(i);
                        return (
                            <div key={i.id} style={{margin: 5}}>
                                <img key={i['poster_path']} alt={`A poster for ${i.title}`}
                                     src={`https://image.tmdb.org/t/p/w500${i['backdrop_path']}`}/>
                                <div>{i}</div>
                                <div>{i['vote_average']}</div>
                                <div>{i['release_date']}</div>
                                <br/>
                            </div>
                        )
                    })}</div>
        );
    }
}

export default MoviePage;
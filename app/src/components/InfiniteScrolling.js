import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {movieByGenre} from "./ScrollComponent";
import MoviePage from "./MoviePage";
import Popup from "reactjs-popup";

class InfiniteScrolling extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            query: props.query
        }
        this.state = {
            items: [],
            pageNumber: 2
        };
    }

    componentDidMount() {
        movieByGenre(this.props.query, 1).then((res) => {
            this.updateState('items', res.data.results);
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
        const res = await movieByGenre(this.props.query, this.state.pageNumber);
        const data = await res.data;
        console.log(data);
        this.updateState('items', [...this.state.items, ...data.results]);
        this.updateState('pageNumber', this.state.pageNumber + 1);
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
            movieByGenre(this.props.query, 1).then((res) => {
                this.updateState('items', res.data.results);
            });
        }
    }

    render() {
        return (
                <InfiniteScroll
                    next={this.fetchData}
                    hasMore={true}
                    loader={<h4>Loading more...</h4>}
                    dataLength={this.state.items.length}
                >
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {this.state.items.map((i) => {
                            return (
                                <div key={i.id} style={{margin: 5}}>
                                    <img key={i['poster_path']} alt={`A poster for ${i.title}`}
                                         src={`https://image.tmdb.org/t/p/w500${i['backdrop_path']}`}/>
                                    <div>{i.title}</div>
                                    <div>{i['vote_average']}</div>
                                    <div>{i['release_date']}</div>
                                    <Popup contentStyle={{width: "40%", backgroundColor: "grey"}} trigger={<button> See More </button>} position={"right top"}>
                                        <MoviePage query={i.id}/>
                                    </Popup>
                                    <br/>
                                </div>
                            )
                        })}</div>
                </InfiniteScroll>
        );
    }
}

export default InfiniteScrolling;
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {movieMultiFilter} from "./ScrollComponent";
import MoviePage from "./MoviePage";
import Popup from "reactjs-popup";

class InfiniteScrolling extends React.Component {
    constructor(props) {
        super(props);
        this.props = {
            query: props.query,
            sort: props.sort,
            yearA: props.yearA,
            yearB: props.yearB,
            runtime: props.runtime
        }
        this.state = {
            items: [],
            sort: '',
            yearA: 1895,
            yearB: new Date().getFullYear(),
            runtime: 40,
            pageNumber: 2
        };
    }

    componentDidMount() {
        movieMultiFilter(this.props.query, this.props.sort, this.props.yearA, this.props.yearB, this.props.runtime, 1).then((res) => {
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
        const res = await movieMultiFilter(this.props.query, this.props.sort, this.props.yearA, this.props.yearB, this.props.runtime, this.state.pageNumber);
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
            movieMultiFilter(this.props.query, this.props.sort, this.props.yearA, this.props.yearB, this.props.runtime, 1).then((res) => {
                this.updateState('items', res.data.results);
            });
        }
    }

    formatDate(date){
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
        if(parseInt(date, 5) == 0){
            return monthMap.get(parseInt(date, 6)) + " " + date.substring(8) + ", " + date.substring(0, 4);
        } else {
            let month = date.substring(5, 7);
            return monthMap.get(parseInt(month)) + " " + date.substring(8) + ", " + date.substring(0, 4);
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
                                    <div>Rating: {i['vote_average']}</div>
                                    <div>Released: {this.formatDate(i['release_date'])}</div>
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
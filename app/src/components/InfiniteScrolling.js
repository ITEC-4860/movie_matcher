import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import {movieByGenre} from "./ScrollComponent";

class InfiniteScrolling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            query: props.query,
            pageNumber: 2
        };
    }

    componentDidMount() {
        movieByGenre(this.state.query, 1).then((res) => {
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
        const res = await movieByGenre(this.state.query, this.state.pageNumber);
        const data = await res.data;
        console.log(data);
        this.updateState('items', [...this.state.items, ...data.results]);
        this.updateState('pageNumber', this.state.pageNumber + 1);
        console.log(this.state.items);
    }

    render() {
        return (
            <InfiniteScroll
                next={this.fetchData}
                hasMore={true}
                loader={<h4>Loading more...</h4>}
                dataLength={this.state.items.length}
            >
                {this.state.items.map((i) => {
                    return (
                    <div key={i.id}>
                        <img key={i['poster_path']} alt={`A poster for ${i.title}`} src={`https://image.tmdb.org/t/p/w500${i['backdrop_path']}`}/>
                        <div>{i.title}</div>
                        <div>{i['vote_average']}</div>
                        <div>{i['release_date']}</div>
                        <br/>
                    </div>
                )
                })}
            </InfiniteScroll>
        );
    }
}

export default InfiniteScrolling;
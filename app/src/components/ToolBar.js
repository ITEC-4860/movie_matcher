import React from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfiniteScrolling from "./InfiniteScrolling";

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: '',
            sort: 'popularity.desc',
            yearA: 1895,
            yearB: new Date().getFullYear(),
            runtime: 40,
            pageNumber: 2,
            results: '',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        console.log("Submit Works");
        this.updateState('results', <InfiniteScrolling query={this.state.genres} sort={this.state.sort} yearA={this.state.yearA} yearB={this.state.yearB} runtime={this.state.runtime}/>);
    }

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name + ": " + value);
        this.setState(prevState => {
            const newState = {...prevState};
            newState[name] = value;
            return newState;
        });
    };

    updateState = (state, value) => {
        this.setState(prevState => {
            const newState = {...prevState};
            newState[state] = value;
            return newState;
        });
    };

    render() {
        return (
            <div>
                <input
                    placeholder='Value for genre search'
                    type='text'
                    name='genres'
                    value={this.state.genres}
                    onChange={this.handle_change}/>
                <input
                    placeholder='Value for search sort'
                    type='text'
                    name='sort'
                    value={this.state.sort}
                    onChange={this.handle_change}/>
                <input
                    placeholder='Value for start year'
                    type='text'
                    name='yearA'
                    value={this.state.yearA}
                    onChange={this.handle_change}/>
                <input
                    placeholder='Value for end year'
                    type='text'
                    name='yearB'
                    value={this.state.yearB}
                    onChange={this.handle_change}/>
                <input
                    placeholder='Value for min runtime'
                    type='text'
                    name='runtime'
                    value={this.state.runtime}
                    onChange={this.handle_change}/>
                <button onClick={this.handleClick}>Submit</button>
                {this.state.results}
            </div>
        );
    }
}

export default ToolBar;
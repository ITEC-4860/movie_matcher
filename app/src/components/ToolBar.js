import React from "react";
import "../MoviePage.css";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


import InfiniteScrolling from "./InfiniteScrolling";

class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: '',
            sort: 'popularity.desc',
            yearA: 1895,
            yearB: new Date().getFullYear(),
            range: '',
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

          const handleChange = (val) => this.updateState('genres', val);
        return (


            <div >
                 <p> <strong>Genre </strong> </p>
                         <ToggleButtonGroup

                              type='checkbox'
                              name='genres'

                              value={this.state.genres}
                              onChange={handleChange}

                             className="mb-2">
        <ToggleButton id="Action" value={28}>
          Action
        </ToggleButton>
        <ToggleButton id="Adventure" value={12}>
Adventure
        </ToggleButton>
        <ToggleButton id="Animation" value={16}>
Animation
        </ToggleButton>

      <ToggleButton id="Comedy" value={35}>
Comedy
        </ToggleButton>
                                   <ToggleButton id="Crime" value={80}>
Crime
        </ToggleButton>
                                   <ToggleButton id="Documentary" value={99}>
Documentary
        </ToggleButton>
                                   <ToggleButton id="Drama" value={18}>
Drama
        </ToggleButton>
                                   <ToggleButton id="Fantasy" value={14}>
Family
        </ToggleButton>
                                   <ToggleButton id="History" value={36}>
History
        </ToggleButton>
                              <br/>
                                   <ToggleButton id="Horror" value={27}>
Horror
        </ToggleButton>
                                   <ToggleButton id="Music" value={10402}>
Music
        </ToggleButton>
                                   <ToggleButton id="Mystery" value={9648}>
Mystery
        </ToggleButton>
                                   <ToggleButton id="Romance" value={10749}>
Romance
        </ToggleButton>
                                   <ToggleButton id="ScienceFiction" value={878}>
Science Fiction
        </ToggleButton>

                                   <ToggleButton id="TVMovie" value={10770}>
TV Movie
        </ToggleButton>
                                   <ToggleButton id="Thriller" value={53}>
Thriller
        </ToggleButton>
                                   <ToggleButton id="War" value={10752}>
War
        </ToggleButton>
                                   <ToggleButton id="Western" value={37}>
Western
        </ToggleButton>




      </ToggleButtonGroup>
 <br/>


     <p> <strong>Sort By </strong> </p>
               <ToggleButtonGroup
                         placeholder='Sort by:'
                      type="radio"
                         name="sort"

                              value={this.state.sort}
                              onChange={handleChange}
                         defaultValue={1}>

        <ToggleButton id="year" value={1}>
         year
        </ToggleButton>
        <ToggleButton id="popularity" value={2}>
         popularity
        </ToggleButton>
        <ToggleButton id="asc" value={3}>
          ascending
        </ToggleButton>
                   <ToggleButton id="desc" value={4}>
          descending
        </ToggleButton>


                    {/* value={this.state.sort}*/}
                    {/*onChange={this.handle_change}*/}

      </ToggleButtonGroup>

                <br/>
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

 <br/>
                <label className="form-label" htmlFor="range">Release date range</label>
                <div className="range">
                    <input
                        value={this.state.range}
                        onChange={handleChange}

                        placeholder='Date Range'
                        type="range"
                         name='range'
                        className="form-range"
                        min="1895" max="2023" id="range"
                    />

                </div>


                <label htmlFor="runtime" className="form-label">Maximum Length / Runtime in minutes </label>
                <div className="range">
                    <input type="range" className="form-range" min="0" max="240" step="0.5" id="runtime"/>
                </div>
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
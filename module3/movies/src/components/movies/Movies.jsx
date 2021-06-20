import React, { Component } from 'react';
import Movie from "../movie/Movie";
import "./Movies.css";

class Movies extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="movies">
                {this.props.movies.map( (movieobj) => {
                    return <Movie key={movieobj.id} movie={movieobj}></Movie>
                } )}
            </div> )
    }
}
 
export default Movies;
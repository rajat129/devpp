import React, { Component } from 'react';
import { IMAGE_URL } from '../../api/secrets';
import "./Movie.css";

class Movie extends Component {
    state = {  }
    render() { 
        
        let {title , poster_path,vote_average} = this.props.movie;
        let posterPath = IMAGE_URL+poster_path;
        return ( 
            <div className="movie-item">
                <div className="movie-poster">
                    <img src={posterPath} alt="" />
                </div>
                <div className="movie-info">
                    <div className="movie-title">{title}</div>
                    <div className="rating">{vote_average+" IMDB"}</div>
                </div>
            </div>
         );
    }
}
 
export default Movie;
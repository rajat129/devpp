import React, { Component } from 'react';
import { IMAGE_URL } from '../../api/secrets';
import "./Favourite.css";

class Favourite extends Component {
    state = {  }
    render() { 

        return ( 
            <div className="fav-list">
                {this.props.location.state.map(movieobj => {
                    let {title , poster_path,vote_average} = movieobj;
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
                    )
                })}
            </div>
         );
    }
}
 
export default Favourite;<h1>favourite component</h1>
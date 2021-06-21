import React, { Component } from 'react';
import { API_KEY, API_URL, IMAGE_URL } from '../../api/secrets';
import "./Movie.css";
import {Link} from "react-router-dom";
import axios from 'axios';

class Movie extends Component {
    state = { 
        detaileddata : {}
    }

    async componentDidMount(){
        let response = await axios.get(`${API_URL}/movie/${this.props.movie.id}?api_key=${API_KEY}`);
        let detailedobj = response.data;
        let imgurl = IMAGE_URL+detailedobj.poster_path;
    
        this.setState({
            detaileddata : {...detailedobj , poster_path:imgurl}
        })
    }

    render() { 
        
        let {title , poster_path,vote_average} = this.props.movie;
        let posterPath = IMAGE_URL+poster_path;
        
        return ( 

            
            <div className="movie-item">
                <Link to={{pathname:"/movie", state:this.state.detaileddata , setFavourites:this.props.setFavourites}}>
                    <div className="movie-poster">
                    
                        <img src={posterPath} alt="" />
                    </div>
                    </Link>
                    <div className="movie-info">
                        <div className="movie-title">{title}</div>
                        <div className="rating">{vote_average+" IMDB"}</div>
                    </div>
                
            </div>
         );
    }
}
 
export default Movie;
import React, { Component } from 'react';
import "./Moviepage.css";
import axios from "axios";
import { API_KEY, API_URL } from '../../api/secrets';
import YouTube from 'react-youtube';

class Moviepage extends Component {
    state = { 
        videoobj : {}
     }

    async componentDidMount(){
        let response = await axios.get(`${API_URL}/movie/${this.props.location.state.id}/videos?api_key=${API_KEY}&language=en-US`);

        let videoobj = response.data.results.filter( videoobj => {
            if(videoobj.type=="Trailer" && videoobj.site=="YouTube"){
                return true;
            }
            return false;
        })

        console.log(videoobj);

        this.setState({
            videoobj : videoobj[0]
        })
    }   

    render() { 
        let {title , tagline,vote_average,overview,id,poster_path} = this.props.location.state;

        const opts = {
            height: '490',
            width: '1240',
            playerVars: {
              autoplay: 1,
            },
          };

        return ( 
            <div className="movie-detail">
                <div className="poster">
                    <img src={poster_path} alt="" />
                </div>
                <div className="content">
                    <div className="heading">
                        <h1>{title}</h1>
                        <h3>{vote_average} IMDB</h3>
                        <p>{tagline}</p>
                        <span>{overview}</span>
                    </div>
                    <div className="overview"></div>
                    <br></br>
                    <div className="trailer">
                        <YouTube videoId={this.state.videoobj.key} opts={opts}></YouTube>
                    </div>
                </div>
                
            </div>
         );
    }
}
 
export default Moviepage;
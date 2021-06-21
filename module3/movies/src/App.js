import React, { Component } from 'react';
import { API_KEY, API_URL } from './api/secrets.js';
import Header from "./components/header/Header.jsx";
import Movies from "./components/movies/Movies.jsx";
import axios from "axios";
import Page from "./components/Page/Page.jsx";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import Favourite from './components/Favourite/Favourite.jsx';
import Moviepage from './components/Moviepage/Moviepage.jsx';
import "./App.css";

class App extends Component {
  state = { 
    moviesData : [],
    name : "avengers",
    pages : [],
    currentPage : 1
  }

  async componentDidMount() {
    
    let data = await axios.get(API_URL+"/search/movie" , 
      { params : { api_key : API_KEY , page : this.state.currentpage , query : this.state.name}
    });

    let pages = [];
    for(let i=1;i<=data.data.total_pages;i++){
      pages.push(i);
    }

    this.setState({
      moviesData : data.data.results.slice(0,10),
      pages:pages
    })

    // console.log(data);
  }

  setMovie = async(newMovieName) => {
    let data = await axios.get(API_URL+"/search/movie" , 
      { params : { api_key : API_KEY , page : this.state.currentPage , query : newMovieName}
    });

    let pages = [];
    for(let i=1;i<=data.data.total_pages;i++){
      pages.push(i);
    }

    this.setState({
      moviesData : data.data.results.slice(0,10),
      name : newMovieName,
      currentPage : 1,
      pages:pages
    })    
  }

  previousPage = async () =>{
    let data = await axios.get(API_URL+"/search/movie" , 
      { params : { api_key : API_KEY , page : this.state.currentPage-1, query : this.state.name}
    });

    this.setState({
      moviesData : data.data.results.slice(0,10),
      currentPage : this.state.currentPage-1
    })
  }

  nextPage = async () =>{

    let data = await axios.get(API_URL+"/search/movie" , 
      { params : { api_key : API_KEY , page : this.state.currentPage+1, query : this.state.name}
    });

    // console.log(data);

    this.setState({
      moviesData : data.data.results.slice(0,10),
      currentPage : this.state.currentPage+1
    })
  }

  setPage = async (pagescount) =>{
    let data = await axios.get(API_URL+"/search/movie" , 
      { params : { api_key : API_KEY , page : pagescount, query : this.state.name}
    });

    // console.log(data);

    this.setState({
      moviesData : data.data.results.slice(0,10),
      currentPage : pagescount
    })
  }

  render() { 
    return (
      <Router>
        <div className="App">
          <Header setMovie={this.setMovie}></Header>

          <Switch>

            <Route path="/" exact>
              <Movies movies={this.state.moviesData}></Movies>
              <Page
                previousPage={this.previousPage}
                nextPage={this.nextPage}
                setPage={this.setPage}
                pages={this.state.pages}
                currentPage={this.state.currentPage}
              ></Page>
            </Route>

            <Route path="/fav" exact>
              <Favourite></Favourite>
            </Route>

            <Route path="/movie" exact component={Moviepage}>
            </Route>
          </Switch>

        </div> 
      </Router>
     );
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import SearchForm from "./Components/SearchForm";
import HeadInterface from "./Components/HeadInterface";
import GifList from "./Components/GifList";
import Banner from "./Components/Banner";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = "cats") => {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`
      )
      .then(response => {
        this.setState({
          gifs: response.data.data,
          loading: false
        });
      })
      .catch(error => {
        console.log("Error fetching and parsing data", error);
      });
  };

  render() {
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <HeadInterface />
            <SearchForm onSearch={this.performSearch} />
            <Banner />
          </div>
        </div>
        <div className="main-content">
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            <GifList data={this.state.gifs} />
          )}
        </div>
        <div>
          <p className="credit">
            Website Powered By{" "}
            <a href="https://giphy.com/" target="_blank" rel="noopener">
              GIPHY.COM
            </a>
          </p>
        </div>
      </div>
    );
  }
}

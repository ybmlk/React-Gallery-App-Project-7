import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

// Import Components
import SearchForm from './Components/SearchForm';
import Navigation from './Components/Navigation';
import Gallery from './Components/Gallery';
import Page404 from './Components/Page404';

// Import Api-key
import apiKey from './config';
// Refers to the number of photos displyed 
const numOfPhotos = 24;



export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      title: '',
      loading: true
    }
  }

  // Fetches photos from Flickr API and updates the states
  performSearch = (query) => {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${numOfPhotos}&format=json&nojsoncallback=1`
    axios.get(url)
      .then(res => {
        this.setState({
          photos: res.data.photos.photo,
          // The argument passed to this function will be the title
          title: query,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm onSearch={this.performSearch} />
          <Navigation onSearch={this.performSearch} />

          <Switch>
            <Route exact path="(/|/gallery)" render={() => <Redirect to="/gallery/nature" />} />
            <Route exact path="/gallery/:input" render={() => (
              <Gallery
                data={this.state.photos}
                title={this.state.title}
                loading={this.state.loading}
                onSearch={this.performSearch} />
            )} />
            <Route component={Page404} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

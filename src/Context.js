import React, { Component } from 'react';
import axios from 'axios';
// Import Api-key
import apiKey from './config';
// Refers to the number of photos displyed
const numOfPhotos = 24;

const Context = React.createContext();

class Provider extends Component {
  state = {
    photos: [],
    title: '',
    loading: true,
    currentPage: 1,
  };

  // Fetches photos from Flickr API and updates the states
  performSearch = query => {
    const pageNum = this.state.currentPage;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=${numOfPhotos}&page=${pageNum}&format=json&nojsoncallback=1`;
    axios
      .get(url)
      .then(res => {
        this.setState(() => ({
          photos: res.data.photos.photo,
          // The argument passed to this function will be the title
          title: query,
          loading: false,
        }));
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  // called when 'next' is clicked
  incrementPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  // Called when 'previous' is clicked
  decrementPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage - 1 }));
  };

  // Make the cliked page active
  setCurrentPage = page => {
    this.setState(() => ({ currentPage: page }));
  };

  render() {
    const value = {
      state: { ...this.state },
      action: {
        search: this.performSearch,
        incrementPage: this.incrementPage,
        decrementPage: this.decrementPage,
        setCurrentPage: this.setCurrentPage,
      },
    };
    return <Context.Provider value={value}>{this.props.children}</Context.Provider>;
  }
}

const Consumer = Context.Consumer;

const withContext = Component => {
  return props => {
    return (
      <Context.Consumer>{context => <Component {...props} context={context} />}</Context.Consumer>
    );
  };
};

export default withContext;
export { Provider, Consumer };

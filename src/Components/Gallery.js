import React, { Component } from 'react';
import Photo from './Photo';
import { withRouter } from 'react-router';

class Gallery extends Component {

  componentDidMount() {
    this.input = this.props.match.params.input;
    this.props.onSearch(this.input)
  }

  // todo: add <NoPhotos/>

  render() {
    const results = this.props.data
    let photos = results.map((photo, index) => (
      <Photo
        {...photo}
        key={index}
      />
    ))

    return (
      <div className="photo-container">
        <h2>{this.props.query.toUpperCase()} </h2>
        <ul>
          {photos}
        </ul>
      </div>
    )
  }
}

export default withRouter(Gallery);
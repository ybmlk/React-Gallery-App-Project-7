import React from 'react';
import Photo from './Photo';

const Gallery = (props) => {

  const results = props.data;
  // todo: add <NoPhotos/>
  let photos = results.map(photo => (
    <Photo {...photo} />
  ))

  return (
    <div className="photo-container">
      <h2>Results</h2>
      <ul>
        {photos}
      </ul>
    </div>
  )
}

export default Gallery;
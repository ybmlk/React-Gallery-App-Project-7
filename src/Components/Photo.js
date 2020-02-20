import React from 'react';

const Photo = ({ farm, server, id, secret, index, zoom }) => {
  // constructs the url for an image
  const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;

  return (
    <li id={index}>
      <img src={url} alt='' onClick={zoom} />
    </li>
  );
};

export default Photo;

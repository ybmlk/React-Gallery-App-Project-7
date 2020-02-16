import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = props => {
  // Fetchs from Flickr API when buttons are clicked
  // And updates the current route
  return (
    <nav className='main-nav'>
      <ul>
        <li>
          <NavLink to={`/gallery/nature`} onClick={() => props.onSearch('nature')}>
            Nature{' '}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/gallery/slow-loris`} onClick={() => props.onSearch('slow-loris')}>
            {' '}
            Slow loris{' '}
          </NavLink>
        </li>
        <li>
          <NavLink to={`/gallery/savanna`} onClick={() => props.onSearch('savanna')}>
            {' '}
            Savanna{' '}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

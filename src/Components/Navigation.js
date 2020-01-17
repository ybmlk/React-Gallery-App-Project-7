import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import Gallery from './Gallery';


const Navigation = ({ onSearch }) => {

  const searchValue = e => {
    onSearch(e.target.innerText)
  };

  return (
    <nav class="main-nav">
      <ul>
        <li><NavLink to={`/cats`} onClick={searchValue}>Cats</NavLink></li>
        <li><NavLink to={`/dogs`} onClick={searchValue}>Dogs</NavLink></li>
        <li><NavLink to={`/computers`} onClick={searchValue}>Computers</NavLink></li>
      </ul>


    </nav>

  )
}

export default Navigation


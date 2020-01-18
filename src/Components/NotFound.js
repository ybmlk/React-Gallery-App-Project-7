import React from 'react';

// Is called if no data is fetched for a given search request
const NotFound = () => (
  <li className="not-found">
    <h3>No Results Found</h3>
    <p>Your search did not return any results. Please try again.</p>
  </li>
)

export default NotFound
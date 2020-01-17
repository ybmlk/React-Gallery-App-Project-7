import React from 'react';
import { withRouter } from 'react-router';

const Page404 = ({ location }) => (
  <div>
    <h1>404: Page Not Found</h1>
    <h3>
      <code>"{location.pathname}"</code> is not available
    </h3>
  </div>
)

export default withRouter(Page404)
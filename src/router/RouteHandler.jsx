import React from 'react';
import { Router } from 'react-navi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import routes from './routes';

const RouteHandler = (props) => {
  const {
    store,
    children,
  } = props;

  return (
    <Router
      routes={routes}
      context={{
        store,
      }}
    >
      <React.Suspense fallback={<div>Hello!</div>}>
        {children}
      </React.Suspense>
    </Router>
  );
};

RouteHandler.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  isSuperadmin: state.isSuperadmin,
});

export default connect(mapStateToProps)(RouteHandler);

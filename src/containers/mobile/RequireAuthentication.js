import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import keycloak from '../../keycloak-config';
import { authenticate } from '../../store/user/action';

export default function RequireAuthentication(Component) {
  class Authentication extends React.Component {
    componentWillMount() {
      if (!keycloak.isAuthenticated) {
        keycloak
          .init({ onLoad: 'check-sso', checkLoginIframe: false })
          .success(authenticated => {
            if (authenticated) {
              sessionStorage.setItem('kctoken', keycloak.token);
              sessionStorage.setItem('username', keycloak.tokenParsed.name);
              sessionStorage.setItem(
                'user',
                keycloak.tokenParsed.preferred_username
              );
              this.props.dispatch(
                authenticate({
                  id: sessionStorage.username,
                  name: sessionStorage.username,
                })
              );
              setInterval(() => {
                keycloak.updateToken(10).error(() => keycloak.logout());
                sessionStorage.setItem('kctoken', keycloak.token);
              }, 10000);
            }
          });
      }
    }

    render() {
      return (
        <Route
          render={props => {
            return this.props.isAuthenticated ? (
              <Component {...props} />
            ) : (
              keycloak.login()
            );
          }}
        />
      );
    }
  }

  Authentication.propTypes = {
    dispatch: PropTypes.func,
    isAuthenticated: PropTypes.bool,
  };

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.user.isAuthenticated,
    };
  }

  return withRouter(connect(mapStateToProps)(Authentication));
}

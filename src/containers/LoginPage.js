import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import { Card, CardText, CardTitle } from 'react-md/lib/Cards';

import { login } from '../store/user/action';

import '../assets/stylesheets/LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  formValid() {
    const { username, password } = this.state;

    return (
      !!username && username.length > 0 && !!password && password.length > 0
    );
  }

  render() {
    const { message } = this.props;
    const { username, password } = this.state;

    return (
      <Card className="LoginPage-card">
        <CardTitle
          title="Login"
          subtitle="Authenticate to view user content."
        />
        <CardText className="LoginPage-card-text">
          <TextField
            id="username"
            onChange={value => this.setState({ username: value })}
            placeholder="Username"
            value={username}
            required
            className="LoginPage__text-field md-cell md-cell--bottom"
          />
          <TextField
            id="password"
            onChange={value => this.setState({ password: value })}
            placeholder="Password"
            type="password"
            value={password}
            required
            className="LoginPage__text-field md-cell md-cell--bottom"
          />
          <Button
            className="LoginPage__submit md-cell md-cell--bottom"
            disabled={!this.formValid()}
            raised
            primary
            type="submit"
            onClick={() => {
              const credentials = {
                username: username,
                password: password,
              };
              this.props.dispatch(login(credentials));
            }}
          >
            Login
          </Button>
          <span className="LoginPage__message">{message}</span>
        </CardText>
      </Card>
    );
  }
}

LoginPage.propTypes = {
  message: PropTypes.string,
  dispatch: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    message: state.user.message,
    isAuthenticated: state.user.isAuthenticated,
  };
}

export default connect(mapStateToProps)(LoginPage);

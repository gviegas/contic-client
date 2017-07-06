//
// Created by Gustavo Viegas on 2016/12
//

import React, { Component } from 'react';
import signInLogo from './img/signin-logo.svg';
import './css/SignIn.css';

class SignInLogo extends Component {
  render() {
    return (
      <div className="SignInLogo">
        <img src={signInLogo} width="400" alt="CONTIC" />
      </div>
    );
  }
}

class SignInFormUser extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="SignInFormUser">
        <input type="email" id="SignInFormUser" placeholder="User" maxLength="40"
        value={this.props.value}
        onChange={this.handleChange} />
      </div>
    );
  }
}

class SignInFormPwd extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="SignInFormPwd">
        <input type="password" id="SignInFormPwd" placeholder="Password" minLength="8" maxLength="30"
        value={this.props.value}
        onChange={this.handleChange} />
      </div>
    );
  }
}

class SignInFormSubmit extends Component {
  render() {
    return (
      <div className="SignInFormSubmit">
        <input type="submit" id="SignInFormSubmit" value="Submit" />
      </div>
    );
  }
}

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {userValue : '', pwdValue : ''};
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handlePwdInput = this.handlePwdInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserInput(value) {
    this.setState({userValue : value});
  }

  handlePwdInput(value) {
    this.setState({pwdValue : value});
  }

  handleSubmit(event) {
    // TODO: signin logic
    this.props.onViewChange(null);
    event.preventDefault();
  }

  render() {
    return (
      <form className="SignInForm" onSubmit={this.handleSubmit}>
        <SignInFormUser value={this.state.userValue} onChange={this.handleUserInput} />
        <SignInFormPwd value={this.state.pwdValue} onChange={this.handlePwdInput} />
        <SignInFormSubmit />
      </form>
    );
  }
}

class SignIn extends Component {
  render() {
    return (
      <div className="SignIn">
        <SignInLogo />
        <SignInForm onViewChange={this.props.onViewChange} />
      </div>
    );
  }
}

export default SignIn;

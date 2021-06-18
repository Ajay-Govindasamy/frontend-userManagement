import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormErrors from '../FormErrors';
import Notifications, { notify } from 'react-notify-toast';

export default class Register extends Component {
  state = {
    username: '',
    fullName: '',
    emailId: '',
    password: '',
    confirm: '',
    formErrors: { emailId: '', password: '' },
    emailValid: false,
    passwordValid: false,
    formValid: false,
  };

  constructor(props) {
    super(props);
    this.registerNewUser = this.registerNewUser.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  //registering new user
  registerNewUser(event) {
    event.preventDefault();
    let formdata = {
      username: this.state.username,
      fullName: this.state.fullName,
      email: this.state.emailId,
      password: this.state.password,
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    };
    var baseUrl = 'https://ajay-node-assignment.herokuapp.com/users/signup';
    fetch(baseUrl, requestOptions).then(function (response, error) {
      if (error) alert(error);
      if (response.status === 200) {
        notify.show('Registered Successfully !', 'success');
        setTimeout(function () {
          window.location.pathname = '/sign-in';
        }, 2000);
      } else {
        notify.show(
          'Registration Failed, E-mail or user already exists',
          'error'
        );
      }
    });
  }

  //validating register form fields
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'emailId':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'confirm':
        passwordValid = value.match(this.state.password);
        fieldValidationErrors.password = passwordValid ? '' : ' did not match';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  //Validating form fields during "onChange event "
  myChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  render() {
    return (
      <div className='auth-wrapper'>
        <div className='auth-inner'>
          <Notifications />
          <form onSubmit={this.registerNewUser}>
            <h3>Register</h3>
            <div className='panel panel-default form-error-color'>
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className='form-group'>
              <label>User name</label>
              <input
                type='text'
                className='form-control'
                name='username'
                placeholder='username'
                value={this.state.username}
                onChange={this.myChangeHandler}
              />
            </div>
            <br />
            <div className='form-group'>
              <label>Full name</label>
              <input
                type='text'
                className='form-control'
                name='fullName'
                placeholder='Full name'
                value={this.state.fullName}
                onChange={this.myChangeHandler}
              />
            </div>
            <br />
            <div className='form-group'>
              <label>Email address</label>
              <input
                type='email'
                className='form-control'
                name='emailId'
                placeholder='Enter email address'
                value={this.state.emailId}
                onChange={this.myChangeHandler}
              />
            </div>
            <br />
            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                className='form-control'
                name='password'
                placeholder='Enter password'
                value={this.state.password}
                onChange={this.myChangeHandler}
              />
            </div>
            <br />
            <div className='form-group'>
              <label>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                name='confirm'
                placeholder='Enter confirm password'
                value={this.state.confirm}
                onChange={this.myChangeHandler}
              />
            </div>
            <br />
            <div className='center'>
              <button
                disabled={!this.state.formValid}
                type='submit'
                className='btn btn-primary btn-block'
              >
                Register
              </button>
            </div>
            <Link to='/sign-in'>
              <p className='forgot-password text-right'>
                Already registered? <a> sign in</a>
              </p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

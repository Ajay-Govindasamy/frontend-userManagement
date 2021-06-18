import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';
import { FaUserPlus } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class Login extends Component {
  //Initial State
  state = {
    emailId: '',
    password: '',
  };

  //Binding events
  constructor(props) {
    super(props);
    this.validateUser = this.validateUser.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  //Authenticating user to dashboard
  validateUser(event) {
    event.preventDefault();
    let formdata = {
      email: this.state.emailId,
      password: this.state.password,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    };

    fetch(
      `https://ajay-node-assignment.herokuapp.com/users/signin`,
      requestOptions
    )
      .then((response) => response.json())
      .then(function (data) {
        if (data.status === 'success') {
          const promise = new Promise(function (resolve, reject) {
            cookies.set('token', data.token);
            cookies.set('username', data.user.username);
            cookies.set('fullName', data.user.fullName);
            cookies.set('email', data.user.email);
            setTimeout(function () {
              resolve();
            }, 1000);
          });
          promise.then(function (value) {
            window.location.href = '/dashboard';
          });
        } else {
          notify.show('E-mail/password entered is wrong', 'error');
        }
      })
      .catch((error) => alert(error.message));
  }

  //handle onChange and state data's
  myChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Fragment>
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Notifications />
            <form onSubmit={this.validateUser}>
              <h3>Sign In</h3>

              <div className='form-group'>
                <label>Email address</label>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter email'
                  name='emailId'
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
                  placeholder='Enter password'
                  name='password'
                  value={this.state.password}
                  onChange={this.myChangeHandler}
                />
              </div>
              <br />
              <div className='center'>
                <button type='submit' className='btn btn-primary btn-block'>
                  Sign In
                </button>
              </div>
              <p className='forgot-password text-right'>
                Forgot <a href='#'>password?</a>
              </p>
              <hr />
              <br />
              <div className='center'>
                <Link to='/register'>
                  <Button className='btn btn-warning btn-block'>
                    <FaUserPlus /> Register
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

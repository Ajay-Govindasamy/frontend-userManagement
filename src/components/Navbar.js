import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class NavHeader extends Component {
  render() {
    return (
      <Fragment>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <a className='navbar-brand' href='#'>
              User Management
            </a>

            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                <li className='nav-item'>
                  <a className='nav-link active' aria-current='page' href='#'>
                    Home
                  </a>
                </li>
              </ul>
              <form className='d-flex'>
                <button
                  className='btn btn-outline-success'
                  type='submit'
                  onClick={(e) => e.preventDefault()}
                >
                  {' '}
                  <Link to='/sign-in' className='remove-link'>
                    Logout
                  </Link>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

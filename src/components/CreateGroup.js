import React, { Component, Fragment } from 'react';
import NavHeader from './Navbar';
import Notifications, { notify } from 'react-notify-toast';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class CreateGroup extends Component {
  state = {
    groupName: '',
    groupID: '',
    groupCapacity: '',
  };

  constructor() {
    super();
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.createNewGroup = this.createNewGroup.bind(this);
  }

  myChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //creating a new group
  createNewGroup(event) {
    event.preventDefault();
    let formdata = {
      groupName: this.state.groupName,
      groupID: this.state.groupID,
      groupCapacity: this.state.groupCapacity,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': `${cookies.get('token')}`,
      },
      body: JSON.stringify(formdata),
    };

    fetch(
      `https://ajay-node-assignment.herokuapp.com/group/createGroup/${cookies.get(
        'username'
      )}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.message);
        if (response.message === 'Group Created.') {
          window.location.href = '/dashboard';
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => alert(error.message));
  }

  render() {
    return (
      <Fragment>
        <NavHeader />
        <div className='auth-wrapper'>
          <div className='auth-inner'>
            <Notifications />
            <form onSubmit={this.createNewGroup}>
              <h3>Add New Group</h3>

              <div className='form-group'>
                <label>Group Name</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter Group Name'
                  name='groupName'
                  value={this.state.groupName}
                  onChange={this.myChangeHandler}
                />
              </div>
              <br />

              <div className='form-group'>
                <label>Group ID</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Enter Group Id'
                  name='groupID'
                  value={this.state.groupID}
                  onChange={this.myChangeHandler}
                />
              </div>
              <br />

              <div className='form-group'>
                <label>Group Capacity</label>
                <input
                  type='number'
                  className='form-control'
                  placeholder='Enter Group Capacity'
                  name='groupCapacity'
                  value={this.state.groupCapacity}
                  onChange={this.myChangeHandler}
                />
              </div>
              <br />
              <div className='center'>
                <button type='submit' className='btn btn-primary btn-block'>
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

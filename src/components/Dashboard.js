import React, { Component, Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';
import NavHeader from './Navbar';
import { FaUserFriends } from 'react-icons/fa';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
const cookies = new Cookies();

class Dashboard extends Component {
  state = {
    groups: [],
  };

  //fetching all the available groups list once after the component is rendered on the DOM
  componentDidMount() {
    const requestOptions = {
      headers: {
        'x-auth-token': `${cookies.get('token')}`,
      },
    };
    fetch(
      'https://ajay-node-assignment.herokuapp.com/group/allGroups',
      requestOptions
    )
      .then((response) => response.json())
      .then((groupList) => {
        this.setState({ groups: groupList });
      });
  }

  //displaying all the groups list, create group component navigation and remove a specific group
  render() {
    return (
      <Fragment>
        <div>
          <NavHeader />
          <div className='container mt-5'>
            <Button
              className='pull-right'
              bsStyle='success'
              onClick={() => {
                window.location.href = '/create-group';
              }}
            >
              <FaUserFriends />
              &nbsp; Create
            </Button>
            <Table bordered striped hover className='mt-3'>
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Group Owner</th>
                  <th>Group Members</th>
                  <th>Remove Group</th>
                </tr>
              </thead>
              <tbody>
                {this.state.groups.map((group) => (
                  <tr key={group._id}>
                    <td>
                      <Link to={`/view-group/${group.groupID}`}>
                        <p>{group.groupName}</p>
                      </Link>
                    </td>
                    <td>{group.ownerName}</td>
                    <td>
                      {group.members.length + ' / ' + group.groupCapacity}
                    </td>
                    <td>
                      {group.ownerName === cookies.get('fullName') ? (
                        <Fragment>
                          <div>
                            <Link
                              to={`/remove-group/${group.groupID}/${cookies.get(
                                'username'
                              )}`}
                            >
                              <Button className='pull-right btn-danger'>
                                Delete
                              </Button>
                            </Link>
                          </div>
                        </Fragment>
                      ) : (
                        <div></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboard;

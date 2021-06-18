import React, { Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaUserFriends } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import NavHeader from './Navbar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function GroupMemberDetails() {
  let { id } = useParams();

  let [responseData, setResponseData] = React.useState('');

  const requestOptions = {
    headers: {
      'x-auth-token': `${cookies.get('token')}`,
    },
  };

  //Assigning and removing group Admin(s)
  React.useEffect(() => {
    fetch(
      `https://ajay-node-assignment.herokuapp.com/group/getGroup/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setResponseData, responseData]);

  const makeRemoveAdmin = (event, groupID, username) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'x-auth-token': `${cookies.get('token')}`,
      },
    };
    let url = event.target.checked
      ? 'https://ajay-node-assignment.herokuapp.com/group/makeAsAdmin'
      : 'https://ajay-node-assignment.herokuapp.com/group/removeAsAdmin';
    fetch(
      `${url}/${groupID}/${username}/${cookies.get('username')}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <NavHeader />
      <div className='jumbotron m-3'>
        <h3>{responseData.groupName}</h3>
        <h4 className='align-right'>Owner: {responseData.ownerName}</h4>
        <h4 className='align-right'>
          Group Capacity: {responseData.groupCapacity}
        </h4>
        <Button
          className='pull-right'
          bsStyle='success'
          onClick={() => {
            window.location.href = '/create-group';
          }}
        >
          <FaUserFriends />
          &nbsp; Add User
        </Button>
        <br />
        <br />
        {responseData != undefined && responseData.members != undefined ? (
          <Table bordered striped hover className='mt-3'>
            <thead>
              <tr>
                <th>Members</th>
                {!(responseData.ownerName === cookies.get('fullName')) ? (
                  <Fragment></Fragment>
                ) : (
                  <th>Admin</th>
                )}
              </tr>
            </thead>
            <tbody>
              {responseData.members.map((member) => (
                <tr key={member._id}>
                  <td>{member.name}</td>
                  {!(responseData.ownerName === cookies.get('fullName')) ? (
                    <Fragment></Fragment>
                  ) : (
                    <td>
                      {member.isAdmin ? (
                        <input
                          type='checkbox'
                          onChange={function (event) {
                            makeRemoveAdmin(
                              event,
                              responseData.groupID,
                              member.userName
                            );
                          }}
                          checked
                        />
                      ) : (
                        <input
                          type='checkbox'
                          onChange={function (event) {
                            makeRemoveAdmin(
                              event,
                              responseData.groupID,
                              member.userName
                            );
                          }}
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No members to display!!!</p>
        )}
      </div>
    </Fragment>
  );
}

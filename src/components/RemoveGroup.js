import React, { Fragment } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaUserFriends } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import NavHeader from './Navbar';
import Cookies from 'universal-cookie';
import Dashboard from './Dashboard';
import Notification, { notify } from 'react-notify-toast';
const cookies = new Cookies();

export default function RemoveGroup() {
  let { id, username } = useParams();

  let [responseData, setResponseData] = React.useState('');

  const requestOptions = {
    headers: {
      'x-auth-token': `${cookies.get('token')}`,
    },
  };

  //Deleting a group
  React.useEffect(() => {
    fetch(
      `https://ajay-node-assignment.herokuapp.com/group/deleteGroup/${id}/${username}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        notify.show('Removed Group Successfully');
        setResponseData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setResponseData, responseData]);

  return (
    <Fragment>
      <Dashboard />
      <Notification />
    </Fragment>
  );
}

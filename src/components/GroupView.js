import React, { Component } from 'react';
import GroupMemberDetails from './GroupDetailedView';

class GroupView extends Component {
  state = {
    group: {},
  };
  async componentDidMount() {}
  render() {
    return <GroupMemberDetails group={this.state.group}></GroupMemberDetails>;
  }
}

export default GroupView;

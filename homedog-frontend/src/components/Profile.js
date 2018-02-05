import React from 'react';
import withAuth from './hocs/withAuth'
import * as actions from '../actions'
import { connect } from 'react-redux'
import VerticalNavBar from './VerticalNavBar'
import { adapter } from '../services';


class Profile extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    console.log("profile page", this.props);
    const {currentUser, allUsers} = this.props
    let me;
    me = allUsers ? allUsers.find(x => x.username === currentUser.username) : null

    console.log("do I have me", me);
    // debugger


    return (
      <div>
        <VerticalNavBar />
        <div className="Profile">
          {me? `Welcome ${me.full_name}` : "loading"}!

        </div>

      </div>
    )
  }
}

const mapStateToProps = ({auth, users}) => (
  {loggedIn: !!auth.currentUser.id,
  currentUser: auth.currentUser,
  allUsers: users
});
export default withAuth(connect(mapStateToProps, actions) (Profile))

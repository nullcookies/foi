import React, { Component } from 'react';
import client from 'services/feathers';
import { loadUserChats } from 'actions/users';
import { connect } from 'react-redux';
import { hasUser } from 'services/auth';
import Bundle from 'components/bundle';
import loadChats from 'bundle-loader?lazy!components/chats';

class UserChats extends Component {
  componentDidMount () {
    const { auth } = this.props;
    if(hasUser(auth)) {
      this.props.loadUserChats(auth.user.id);
    }
  }

  componentWillUpdate (nextProps) {
    if(nextProps.auth !== this.props.auth) {
      if(nextProps.auth.user) {
        this.props.loadUserChats(nextProps.auth.user.id);
      }
    }
  }

  render () {
    const { auth, chats } = this.props;
    if(chats !== undefined) {
      return (
        <Bundle load={loadChats}>
          {Chats => (
            <Chats chats={chats} />
          )}
        </Bundle>
      )
    } else {
      return null;
    }
  }
}

const getUserChats = (user, chats) => {
  if(user !== undefined && user.chats !== undefined) {
    return user.chats.reduce((res, id) => {
      if(chats[id])
        res.push(chats[id]);
      return res;
    }, []);
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    chats: state.auth.signedIn ?
      getUserChats(state.users[state.auth.user.id], state.chats) : undefined
  }
};

const mapDispatchToProps = {
  loadUserChats
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChats);

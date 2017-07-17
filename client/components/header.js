import React, { Component } from 'react';
import styled from 'styled-components';
import styleUtils from '../style-utils';

class Header extends Component {

  constructor (props) {
    super(props);
    this.logout = this.props.logout;
  }

  render () {
    const { user, payload } = this.props;
    return <nav id="auth">
      {(user === undefined && payload !== undefined) &&
        <a href={`https://telegram.me/${foi.botName}?start=${payload.key}`} target="_blank">Authenticate</a>
      }
      {user !== undefined &&
        <div>
          <h2>Hello, {user.first_name}.</h2>
          <a href="javascript:void(0);" onClick={this.logout.bind(this)}>Logout</a>
        </div>
      }
    </nav>;
  }

}

export default Header;

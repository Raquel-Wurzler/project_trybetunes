import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
    state ={
      userName: '',
      loading: false,
    }

    componentDidMount() {
      this.captureName();
    }

    captureName = async () => {
      this.setState({
        loading: true,
      });
      const userObj = await getUser();
      this.setState({
        userName: userObj,
        loading: false,
      });
    }

    render() {
      const { loading, userName } = this.state;
      const elementUser = (
        <h1 data-testid="header-user-name">
          {`Olá ${userName.name}!!`}
        </h1>);
      return (
        <header data-testid="header-component">
          { loading ? <Loading /> : elementUser }
        </header>
      );
    }
}

export default Header;

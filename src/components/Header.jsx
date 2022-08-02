import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <ul>
            <li><Link data-testid="link-to-search" to="/search"> Search </Link></li>
            <li><Link data-testid="link-to-favorites" to="/favorites">Favorite</Link></li>
            <li><Link data-testid="link-to-profile" to="/profile"> Profile </Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;

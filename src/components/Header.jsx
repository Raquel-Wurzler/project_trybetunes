import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../css/header.css';

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
      <header data-testid="header-component" className="header">
        <div className="user title is-1">
          { loading ? <Loading /> : elementUser }
        </div>
        <nav>
          <ul className="links-list">
            <li className="link-item">
              <Link data-testid="link-to-search" to="/search"> Search </Link>
            </li>
            <li className="link-item">
              <Link data-testid="link-to-favorites" to="/favorites">Favorite</Link>
            </li>
            <li className="link-item">
              <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;

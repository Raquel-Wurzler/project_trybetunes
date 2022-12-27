import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    loading: false,
    user: '',
  }

  async componentDidMount() {
    await this.getUserLocalStorage();
  }

  getUserLocalStorage = async () => {
    this.setState({ loading: true });
    const showUser = await getUser();
    console.log(showUser);
    this.setState({ user: showUser });
    this.setState({ loading: false });
  }

  render() {
    const { loading, user } = this.state;
    const usuario = (
      <div>
        <img
          src={ user.image }
          alt={ `Imagem do ${user.name}` }
          data-testid="profile-image"
        />
        <p>{ `Nome: ${user.name}` }</p>
        <p>{ `Email: ${user.email}` }</p>
        <p>{ `Descrição: ${user.description}` }</p>
        <Link to="/profile/edit">
          Editar perfil
        </Link>
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        Profile
        <span>
          {
            loading ? <Loading /> : usuario
          }
        </span>
      </div>
    );
  }
}

export default Profile;

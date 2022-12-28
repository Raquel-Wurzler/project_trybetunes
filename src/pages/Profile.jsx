import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../css/titlePage.css';
import '../css/profile.css';

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
      <div className="infos-user">
        <h1 className="title-page">Profile</h1>
        <img
          src={ user.image }
          alt={ `Imagem do ${user.name}` }
          data-testid="profile-image"
          className="img-profile"
        />
        <div className="nome">
          <h1 className="h1-profile">Nome:</h1>
          <p>{ user.name }</p>
        </div>
        <div className="nome">
          <h1 className="h1-profile">Email:</h1>
          <p>{ user.email }</p>
        </div>
        <div className="nome">
          <h1 className="h1-profile">Descrição:</h1>
          <p>{ user.description }</p>
        </div>
        <Link to="/profile/edit" className="btn-profile">
          Editar perfil
        </Link>
      </div>
    );
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="profile">
          <span>
            {
              loading ? <Loading /> : usuario
            }
          </span>
        </div>
      </div>
    );
  }
}

export default Profile;

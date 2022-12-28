import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../css/titlePage.css';
import '../css/profileEdit.css';

class ProfileEdit extends Component {
  state = {
    loading: false,
    name: '',
    email: '',
    description: '',
    image: '',
    btnDisabled: true,
  };

  async componentDidMount() {
    this.setState({ loading: true }, async () => {
      const { name, email, description, image } = await getUser();
      return this.setState({
        loading: false,
        name,
        image,
        email,
        description,
      });
    });
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      const validationBtn = this.validationForm();
      this.setState({ btnDisabled: validationBtn });
    });
  }

  newInfosUser = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = this.state;
    const updatedUser = { name, email, description, image };
    await updateUser(updatedUser);
    const { history } = this.props;
    history.push('/profile');
  }

  validationForm() {
    const { name, email, image, description } = this.state;
    const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    return !(
      name.length !== 0
      && email.length !== 0
      && email.match(regex)
      && image.length !== 0
      && description.length !== 0
    );
  }

  render() {
    const { loading, name, image, email, description, btnDisabled } = this.state;
    const formUser = (
      <form>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            value={ name }
            required
            name="name"
            id="name"
            onChange={ (e) => this.handleChange(e) }
            data-testid="edit-input-name"
            className="input is-danger"
          />
        </label>
        <br />
        <label htmlFor="email">
          Email:
          <input
            type="text"
            value={ email }
            required
            name="email"
            id="email"
            onChange={ (e) => this.handleChange(e) }
            data-testid="edit-input-email"
            className="input is-danger"
          />
        </label>
        <br />
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            value={ description }
            required
            name="description"
            id="description"
            onChange={ (e) => this.handleChange(e) }
            data-testid="edit-input-description"
            className="input is-danger"
          />
        </label>
        <br />
        <label htmlFor="image">
          URL da Imagem:
          <input
            type="text"
            value={ image }
            required
            name="image"
            id="image"
            onChange={ (e) => this.handleChange(e) }
            data-testid="edit-input-image"
            className="input is-danger"
          />
        </label>
        <br />
        <button
          type="button"
          data-testid="edit-button-save"
          disabled={ btnDisabled }
          onClick={ this.newInfosUser }
          className="button is-info"
        >
          Salvar
        </button>
      </form>
    );
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="profileEdit">
          <h1 className="title-page">Editar Perfil</h1>
          <span className="form-profileEdit">
            {
              loading ? <Loading /> : formUser
            }
          </span>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

const NAME_LENGTH = 3;

class Login extends Component {
  state = {
    btnDisabled: true,
    nameInput: '',
    loading: false,
  }

  loginChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      const { nameInput } = this.state;
      const btnIsDisabled = nameInput.length < NAME_LENGTH;
      this.setState({
        btnDisabled: btnIsDisabled,
      });
    });
  }

  btnSaveOnClick = async () => {
    this.setState({ loading: true });
    const { nameInput } = this.state;
    const { history } = this.props;
    await createUser({ name: nameInput });
    history.push('/search');
  }

  render() {
    const { btnDisabled, loading } = this.state;

    const form = (
      <form>
        <input
          type="text"
          name="nameInput"
          id="name"
          data-testid="login-name-input"
          onChange={ this.loginChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ btnDisabled }
          onClick={ this.btnSaveOnClick }
        >
          Entrar
        </button>
      </form>
    );

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        {
          loading ? <Loading /> : form
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Login;

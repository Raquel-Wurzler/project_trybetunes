import React, { Component } from 'react';
import Header from '../components/Header';

const BAND_NAME_LENGTH = 2;

class Search extends Component {
  state = {
    btnIsDisabled: true,
    bandName: '',
  }

  bandNameChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => {
      const { bandName } = this.state;
      const btnForDisabled = bandName.length < BAND_NAME_LENGTH;
      this.setState({
        btnIsDisabled: btnForDisabled,
      });
    });
  }

  render() {
    const { btnIsDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.bandNameChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ btnIsDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

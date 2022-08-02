import React, { Component } from 'react';
import Header from '../components/Header';

const BAND_NAME_LENGTH = 2;

class Search extends Component {
  state = {
    bandName: '',
  }

  bandNameChange = (event) => {
    this.setState({
      bandName: event.target.value,
    });
  }

  render() {
    const { bandName } = this.state;
    const buttonDis = bandName.length < BAND_NAME_LENGTH;
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
            disabled={ buttonDis }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

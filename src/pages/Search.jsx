import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../css/titlePage.css';
import '../css/search.css';

const BAND_NAME_LENGTH = 2;

class Search extends Component {
  state = {
    bandName: '',
    loading: false,
    albuns: [],
    artistName: '',
  }

  bandNameChange = (event) => {
    this.setState({
      bandName: event.target.value,
    });
  }

  btnClickClearAndRequest = async () => {
    const { bandName } = this.state;
    const bandList = await searchAlbumsAPI(bandName);
    this.setState({ loading: true, albuns: [...bandList] }, () => {
      this.setState({
        loading: false,
        artistName: bandName,
        bandName: '',
      });
    });
  }

  render() {
    const { bandName, loading, albuns, artistName } = this.state;
    const form = (
      <form className="form-search">
        <input
          type="text"
          name="bandName"
          value={ bandName }
          data-testid="search-artist-input"
          onChange={ this.bandNameChange }
          className="input is-danger is-medium input-search"
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ bandName.length < BAND_NAME_LENGTH }
          onClick={ this.btnClickClearAndRequest }
          className="button is-dark is-medium button-search"
        >
          Pesquisar
        </button>
      </form>
    );

    const notAlbunSearch = <h3 className="notAlbum">Nenhum álbum foi encontrado</h3>;
    const mapInAlbuns = albuns.map((alb, i) => (
      <div key={ i } className="card-album">
        <img src={ alb.artworkUrl100 } alt={ alb.artistName } className="img-search" />
        <p className="art-name">{ alb.artistName }</p>
        <p>{ alb.collectionName }</p>
        <Link
          to={ `/album/${alb.collectionId}` }
          data-testid={ `link-to-album-${alb.collectionId}` }
        >
          Detalhes Álbum
        </Link>
      </div>
    ));

    const foundAlbum = <h3>{`Resultado de álbuns de: ${artistName}`}</h3>;
    const compareIfAlbun = albuns.length === 0 ? notAlbunSearch : mapInAlbuns;

    return (
      <div data-testid="page-search">
        <Header />
        <div className="search">
          <h1 className="title-page">Search</h1>
          <span>
            { form }
          </span>
          <span>
            {
              loading && foundAlbum
            }
          </span>
          <span className="list-card">
            {
              loading ? <Loading /> : compareIfAlbun
            }
          </span>
        </div>
      </div>
    );
  }
}

export default Search;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
    const buttonDis = bandName.length < BAND_NAME_LENGTH;
    const form = (
      <form>
        <input
          type="text"
          name="bandName"
          value={ bandName }
          data-testid="search-artist-input"
          onChange={ this.bandNameChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ buttonDis }
          onClick={ this.btnClickClearAndRequest }
        >
          Pesquisar
        </button>
      </form>
    );

    const notAlbunSearch = <h3>Nenhum álbum foi encontrado</h3>;
    const mapInAlbuns = albuns.map((alb, i) => (
      <div key={ i }>
        <img src={ alb.artworkUrl100 } alt={ alb.artistName } />
        <Link
          to={ `/album/${alb.collectionId}` }
          data-testid={ `link-to-album-${alb.collectionId}` }
        >
          Detalhes Álbum
        </Link>
        <p>{ alb.collectionName }</p>
        <p>{ alb.artistName }</p>
      </div>
    ));

    const foundAlbum = <h3>{`Resultado de álbuns de: ${artistName}`}</h3>;
    const compareIfAlbun = albuns.length === 0 ? notAlbunSearch : mapInAlbuns;

    return (
      <div data-testid="page-search">
        <Header />
        <span>
          { form }
        </span>
        <span>
          {
            !loading && foundAlbum
          }
        </span>
        <span>
          {
            loading ? <Loading /> : compareIfAlbun
          }
        </span>
      </div>
    );
  }
}

export default Search;

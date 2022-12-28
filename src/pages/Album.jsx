import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import '../css/titlePage.css';
import '../css/album.css';

class Album extends Component {
  state = {
    loading: true,
    musics: [],
    artistName: '',
    albunName: '',
  };

  async componentDidMount() {
    await this.createListMusic();
  }

  createListMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true }, async () => {
      const resultFunc = await getMusics(id);
      const { artistName, collectionName } = resultFunc[0];
      this.setState({
        musics: [...resultFunc],
        artistName,
        albunName: collectionName,
        loading: false,
      });
    });
  }

  render() {
    const { musics, artistName, albunName, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section className="album">
          <h1 data-testid="album-name" className="title-page">
            { `Detalhes do Álbum: ${albunName}` }
          </h1>
          <p data-testid="artist-name" className="art-name-album">
            { `Artista Pesquisado: ${artistName}` }
          </p>
          <div className="albuns">
            {
              loading ? <Loading />
                : <MusicCard musics={ musics } />
            }
          </div>
        </section>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }) })
    .isRequired,
};

export default Album;

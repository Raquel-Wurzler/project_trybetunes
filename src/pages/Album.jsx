import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    loading: true,
    musics: [],
    artistName: '',
    albunName: '',
    songsFavorites: [],
  };

  async componentDidMount() {
    await this.createListMusic();
    await this.recoverFavoriteMusic();
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

  recoverFavoriteMusic = async () => {
    this.setState({ loading: true }, async () => {
      const recover = await getFavoriteSongs();
      console.log('recover', recover);
      this.setState({
        songsFavorites: [...recover],
        loading: false,
      });
    });
  }

  render() {
    const { musics, artistName, albunName, loading, songsFavorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albunName }</h2>
        <div>
          {
            loading ? <Loading />
              : <MusicCard musics={ musics } songsFavorites={ songsFavorites } />
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }) })
    .isRequired,
};

export default Album;

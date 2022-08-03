import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    loading: true,
    musics: [],
    artistName: '',
    albunName: '',
  };

  async componentDidMount() {
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
    const cardMusic = <MusicCard musics={ musics } />;
    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{ artistName }</h1>
        <h2 data-testid="album-name">{ albunName }</h2>
        <div>
          {
            loading ? <Loading /> : cardMusic
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

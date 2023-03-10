import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/titlePage.css';
import '../css/favorites.css';

class Favorites extends Component {
  state = {
    loading: false,
    musics: [],
  };

  async componentDidMount() {
    await this.createFavoritListMusic();
  }

  createFavoritListMusic = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ musics: favorites });
    this.setState({ loading: false });
  }

  render() {
    const { musics, loading } = this.state;
    const renderMusics = (musics.length === 0)
      ? <p>Não há músicas favoritas</p>
      : <MusicCard musics={ musics } favFunc={ this.createFavoritListMusic } />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div className="favorite">
          <h1 className="title-page">Favorites</h1>
          <div>
            {
              loading ? <Loading />
                : renderMusics
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;

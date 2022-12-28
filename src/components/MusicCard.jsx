import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../css/musicCard.css';

class MusicCard extends Component {
  state = {
    loading: false,
    favoriteMusic: [],
  }

  async componentDidMount() {
    await this.recoverFavoriteMusic();
  }

  recoverFavoriteMusic = async () => {
    this.setState({ loading: true }, async () => {
      const recover = await getFavoriteSongs();
      this.setState({
        favoriteMusic: [...recover],
        loading: false,
      });
    });
  }

  checkedClick = async (event, musicObj) => {
    const { checked } = event.target;
    if (checked) {
      this.setState({
        loading: true,
      }, async () => {
        await addSong(musicObj);
        return this.setState((prevState) => ({
          loading: false,
          favoriteMusic: [...prevState.favoriteMusic, musicObj],
        }));
      });
    } else {
      this.setState({
        loading: true,
      }, async () => {
        await removeSong(musicObj);
        return this.setState((prevState) => ({
          loading: false,
          favoriteMusic: prevState.favoriteMusic.filter(
            (item) => item.trackId !== musicObj.trackId,
          ),
        }));
      });
    }
  }

  render() {
    const { musics } = this.props;
    const { loading, favoriteMusic } = this.state;
    const mapMusics = musics.filter((music) => music.kind === 'song').map((music, i) => {
      const isChecked = favoriteMusic.some((musiFav) => (
        musiFav.trackId === music.trackId));
      return (
        <li key={ i } className="li-music-card">
          <h3 className="trackname">{music.trackName}</h3>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite" className="label-checkbox">
            Favorita
            <input
              type="checkbox"
              name="favoriteMusic"
              id="favorite"
              data-testid={ `checkbox-music-${music.trackId}` }
              musics={ musics }
              checked={ isChecked }
              onChange={ (event) => this.checkedClick(event, music) }
              className="test"
            />
          </label>
        </li>
      );
    });
    return (
      <ul>
        {
          loading ? <Loading /> : mapMusics
        }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({ Object })).isRequired,
};

export default MusicCard;

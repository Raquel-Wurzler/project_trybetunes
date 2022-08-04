import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    favoriteMusic: [],
  }

  checkedClick = async (event, musicArray) => {
    const { checked } = event.target;
    if (checked) {
      this.setState({
        loading: true,
      }, async () => {
        await addSong(musicArray);
        // console.log(funcAddSong);
        return this.setState((prevState) => ({
          loading: false,
          favoriteMusic: [...prevState.favoriteMusic, musicArray],
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
      // console.log(musics);
      // console.log(favoriteMusic);
      return (
        <li key={ i }>
          <h3>{music.trackName}</h3>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            <code>audio</code>
            .
          </audio>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              name="musicFavorite"
              id="favorite"
              data-testid={ `checkbox-music-${music.trackId}` }
              musics={ musics }
              checked={ isChecked }
              onChange={ (event) => this.checkedClick(event, music) }
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

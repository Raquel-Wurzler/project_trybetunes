import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    const mapMusics = musics.filter((music) => music.kind === 'song').map((music, i) => (
      <li key={ i }>
        <h3>{music.trackName}</h3>
        <audio data-testid="audio-component" src={ music.previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
          .
        </audio>
      </li>
    ));
    return (
      <ul>
        {
          mapMusics
        }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({ Object })).isRequired,
};

export default MusicCard;

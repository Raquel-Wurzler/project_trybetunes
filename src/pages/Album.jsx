import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musics: [],
  }

  componentDidMount() {
    this.createListMusic();
  }

  createListMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const resultFunc = await getMusics(id);
    this.setState({ musics: [...resultFunc] });
  }

  render() {
    const { musics } = this.state;
    console.log(musics);
    console.log('test');
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <p>{musics}</p>
      </div>
    );
  }
}

// Album.prototype = {
//   match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired }) })
//     .isRequired,
// };

export default Album;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=f7238534c216e83537f2948463fd7a32`)
    .then(res => {
      this.setState({lyrics: res.data.message.body.lyrics});

      return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=f7238534c216e83537f2948463fd7a32`)
    }).then(res => this.setState({track: res.data.message.body.track}))
    .catch(err => console.log(err))
  }

  render() {
    const { track, lyrics }= this.state;
    console.log(track)
    if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0){
      return <Spinner />
    }
    else {
      return (
        <React.Fragment>
          <Link to='/' className="btn btn-dark btn-sm mb-4">Go Back</Link>
          <div className='card'>
            <h5 className='card-header'>
              {track.track_name} by {' '}
      <span className='text-secondary'>{track.artist_name}</span>
            </h5>
            <div className='card-body'>
      <p className='card-text'>{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className='list-group mt-3'>
            <li className='list-group-item'>
              <strong>Album Id</strong>:       {track.album_id}
            </li>
            <li className='list-group-item'>
              <strong>Track Rating</strong>:      
                   {track.track_rating}
            </li>
            <li className='list-group-item'>
              <strong>Explicit Words</strong>:{' '}
              {track.explicit === 0 ? 'No': 'Yes'}
            </li>
            <li className='list-group-item'>
              <strong>See Full Lyrics</strong>: <a href={track.track_share_url} rel='noopener noreferrer' target='_blank'>   Click Here</a>
            </li>
          </ul>
        </React.Fragment>
      )
    }
  }
}

export default Lyrics;
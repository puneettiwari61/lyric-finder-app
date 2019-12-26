import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context'

class Search extends Component {
  state = {
    trackTitle: ''
  }

   onChange = (e) => {
    this.setState({trackTitle: e.target.value})
  }

  removeBlue = e => {
    e.preventDefault();
    e.target.style.outline = 'none';
    e.target.style.boxShadow = 'none';
  }

  findTrack =(dispatch,e) => {
    e.preventDefault();
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=f7238534c216e83537f2948463fd7a32`)
    .then(res => {
      dispatch({
        type: 'SEARCH_TRACKS',
        payload: res.data.message.body.track_list
      })
      this.setState({trackTitle: ''})
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card card-body mb-4 p-4'>
              <h1 className='display-4 text-center'>
                <i className='fas fa-music'/> Search For A song
              </h1>
              <p className='lead text-generator'></p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className='form-group'>
                <input
                  type='text'
                  className='form-control form-control-lg'
                  placeholder='Song title'
                  name='trackTitle'
                  value={this.state.trackTitle}
                  onChange={this.onChange}
                  />
                </div>
                <button className='btn btn-primary btn-lg btn-block mb-5 gohover1' style={{background:'#4F9C87'}} type='submit' onFocus={this.removeBlue} onBlur={this.removeBlue}>Get Track Lyrics</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}


export default Search;
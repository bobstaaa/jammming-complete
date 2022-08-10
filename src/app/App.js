import './App.css';
import SearchBar from '../components/searchBar/searchBar.js';
import React from 'react';
import SearchResults from '../components/searchResults/searchResult';
import Playlist from '../components/playlist/playlist';
import Spotify from '../util/Spotify';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [],
      playlistName: 'Name me',
      playlistTracks: [],
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }
  addTrack(track) {
    const playlistTracks = this.state.playlistTracks;
    //if the track already existsin the playlist breakout of the addTrac function
    if (playlistTracks.find(trackInList => trackInList.id === track.id)) {
      return
    }
    //else add to end of playListTracks and update state
    playlistTracks.push(track)
    this.setState({ playlistTracks: playlistTracks })
  }
  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks;
    const newPlaylistTracks = playlistTracks.filter(x => x !== track)
    this.setState({
      playlistTracks: newPlaylistTracks
    })
  }
  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName,
    })
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
      .then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: [],
        })
      })
  }
  search(searchTerm) {
    Spotify.search(searchTerm)
      .then(res => this.setState({ searchResults: res }))
  }
  render() {
    return (
      <div className='container'>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} updatePlaylistName={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div >
    );
  }
}



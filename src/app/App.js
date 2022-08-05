import './App.css';
import SearchBar from '../components/searchBar/searchBar.js';
import React from 'react';
import SearchResults from '../components/searchResults/searchResult';
import Playlist from '../components/playlist/playlist';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchResults: [{ name: 'track1', artist: 'artist1', album: 'album1', id: 1 }, { name: 'track2', artist: 'artist2', album: 'album2', id: 2 }],
      playlistName: 'My Playlist',
      playlistTracks: [{ name: 'track3', artist: 'artist3', album: 'album3', id: 3 }, { name: 'track4', artist: 'artist4', album: 'album4', id: 4 }],
    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
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
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <div className="App-playlist">
            <SearchBar />
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} updatePlaylistName={this.updatePlaylistName} />
          </div>
        </div>
      </div >
    );
  }
}



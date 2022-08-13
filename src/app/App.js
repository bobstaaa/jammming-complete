import './App.css';
import SearchBar from '../components/searchBar/searchBar.js';
import React from 'react';
import SearchResults from '../components/searchResults/searchResult';
import Playlist from '../components/playlist/playlist';
import Spotify from '../util/Spotify';

export default class App extends React.Component {
  constructor(props) {
    super(props)

    //Codecademy extension project: Ensure playlist information doesn’t get cleared if a user has to refresh their access token
    let prevState = window.sessionStorage.JammmingState
    if (prevState) {
      this.state = JSON.parse(prevState)
    } else {
      this.state = {
        savingPlaylist: false,
        searchResults: [],
        playlistName: 'New Playlist',
        playlistTracks: [],
        playingTrack: {},
      }
    }

    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
  }
  addTrack(track) {
    const playlistTracks = this.state.playlistTracks;
    //if the track already existsin the playlist breakout of the addTrac function
    if (playlistTracks.find(trackInList => trackInList.id === track.id)) {
      return
    }
    //else add to end of playListTracks and update state

    //Codecademy extension project: Only display songs not currently present in the playlist in the search results
    playlistTracks.push(track)
    const searchResults = this.state.searchResults;

    const filteredSearchResults = searchResults.filter(x => x !== track)

    this.setState({ searchResults: filteredSearchResults, playlistTracks: playlistTracks })
  }
  removeTrack(track) {
    const playlistTracks = this.state.playlistTracks;
    const newPlaylistTracks = playlistTracks.filter(x => x !== track)
    const searchResults = this.state.searchResults
    searchResults.push(track)
    this.setState({
      searchResults: searchResults,
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
    //Codecademy extension project: Add a loading screen while playlist is saving
    this.setState({
      savingPlaylist: true,
      playlistTracks: [],
    })
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
      //Codecademy extension project: Add a loading screen while playlist is saving
      .finally(() => {
        this.setState({
          savingPlaylist: false,
          playlistName: 'New Playlist',
        })
      })
  }
  search(searchTerm) {
    window.sessionStorage.searchTerm = searchTerm;
    Spotify.search(searchTerm)
      //Codecademy extension project: Only display songs not currently present in the playlist in the search results
      .then(res => {
        const playlistTracksID = this.state.playlistTracks.map(x => x.id);

        const filteredRes = res.filter(x => !playlistTracksID.includes(x.id))
        this.setState({ searchResults: filteredRes })
      })
  }
  togglePlay(track) {
    let playingTrack = track;
    if (track.id === this.state.playingTrack.id) {
      playingTrack = {}
    }
    this.setState({
      playingTrack: playingTrack,
    })
  }
  //Codecademy extension project: Ensure playlist information doesn’t get cleared if a user has to refresh their access token
  componentDidUpdate() {
    window.sessionStorage.JammmingState = JSON.stringify(this.state)
  }
  render() {
    return (
      <div className='container'>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              togglePlay={this.togglePlay}
              playingTrack={this.state.playingTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              updatePlaylistName={this.updatePlaylistName}
              onSave={this.savePlaylist}
              savingPlaylist={this.state.savingPlaylist}
              togglePlay={this.togglePlay}
              playingTrack={this.state.playingTrack} />
          </div>
        </div>
      </div >
    );
  }
}



import './App.css';
import SearchBar from '../components/searchBar/searchBar.js';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <div className="App-playlist">
          //Add a SearchResults component
          //Add a Playlist component
          </div>
        </div>
      </div >
    );
  }
}



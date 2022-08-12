import React from "react";
import './playlist.css'
import TrackList from "../trackList/trackList";

//Expects playlist name and a track list as props
export default class Playlist extends React.Component {
    constructor(props) {
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    handleNameChange(e) {
        this.props.updatePlaylistName(e.target.value)
    }
    render() {
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange} />
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <button className="Playlist-save" onClick={this.props.onSave}>{this.props.savingPlaylist ? 'SAVING...' : 'SAVE TO SPOTIFY'}</button>
            </div>
        )
    }
}
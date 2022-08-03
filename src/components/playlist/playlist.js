import React from "react";
import './playlist.css'
import TrackList from "../trackList/trackList";

//Expects playlist name and a track list as props
export default class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} />
                <TrackList tracks={this.props.playlistTracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
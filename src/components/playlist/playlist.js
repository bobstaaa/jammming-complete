import React from "react";
import './playlist.css'

export default class Playlist extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="Playlist">
                <input value={'New Playlist'} />
                // <TrackList />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
import React from "react";
import Track from "../track/track";
import './trackList.css'

//Expects a list of tracks as props keys of name, artist and album and id for keying
export default class TrackList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => {
                    return (
                        <Track track={track} key={track.id} />
                    )
                })}
            </div>
        )
    }
}
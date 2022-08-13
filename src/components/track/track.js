import React from "react";
import './track.css'
import playImage from '../../res/play-button.png'
import pauseImage from '../../res/pause.png'
import sadImage from '../../res/sad-face.png'

//Expects an individual track with keys of name, artist and album
export default class Track extends React.Component {
    constructor(props) {
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.togglePlay = this.togglePlay.bind(this)
    }
    addTrack() {
        this.props.onAdd(this.props.track)
    }
    removeTrack() {
        this.props.onRemove(this.props.track)
    }
    renderAction() {
        // If button is for removal
        if (this.props.isRemoval) {
            return (
                <button className="Track-action" onClick={this.removeTrack}>-</button>
            )
        }
        return (
            <button className="Track-action" onClick={this.addTrack}>+</button>
        )
    }
    togglePlay() {
        this.props.togglePlay(this.props.track)
    }
    renderPlay() {
        return (
            <button className="Play-button" onClick={this.togglePlay}>
                <img className="Play-button-image" src={this.props.track.preview ? (this.props.isPlaying ? pauseImage : playImage) : sadImage} alt='play - pause button'></img>
            </button>
        )
    }
    renderPreview() {
        if (this.props.isPlaying) {
            return (
                <video autoPlay name='preview' >
                    <source src={this.props.track.preview} type='audio/mp3'></source>
                </video>
            )
        }
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderPlay()}
                {this.renderAction()}
                {this.renderPreview()}
            </div>
        )
    }
}
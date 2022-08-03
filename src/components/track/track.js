import React from "react";
import './track.css'

//Expects an individual track with keys of name, artist and album
export default class Track extends React.Component {
    constructor(props) {
        super(props)
    }
    renderAction() {
        // Default case
        let symbol = '+'

        // If button is for removal
        if (this.props.isRemoval) {
            symbol = '-'
        }
        return (
            <button className="Track-action">{symbol}</button>
        )
    }
    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}
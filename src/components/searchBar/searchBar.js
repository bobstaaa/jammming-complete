import React from 'react';
import './searchBar.css';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton">SEARCH</button>
            </div>
        )
    }
}
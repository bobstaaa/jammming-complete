import React from 'react';
import './searchBar.css';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        //Codecademy extension project: After user redirect on login, restoring the search term from before the redirect
        let prevState = window.sessionStorage.searchTerm
        if (prevState) {
            this.state = { term: prevState }
        } else {
            this.state = { term: '' }
        }

        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
    }
    search() {
        this.props.onSearch(this.state.term)
    }
    handleTermChange(e) {
        this.setState({
            term: e.target.value,
        })
    }
    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} value={this.state.term} />
                <button className="SearchButton" onClick={this.search} >SEARCH</button>
            </div>
        )
    }
}
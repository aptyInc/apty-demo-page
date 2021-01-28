import React, { Component } from 'react'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search : ""
        }
    }

    handleChange = (event) => {
        var { name, value } = event.target

        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="search-bar" >
                <input type="text" name="search" className="search" onChange={this.handleChange}/>
                <button onClick={() => this.props.searchProducts(this.state.search)}>Search</button>
            </div>
        )
    }
}

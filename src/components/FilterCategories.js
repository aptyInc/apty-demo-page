import React, { Component } from 'react'

export default class FilterCategories extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="filter">
                {Object.keys(this.props.categories).map((categoryName, index) => (
                    <div key={index}>
                        <p className="filter-header">{categoryName}</p>
                        <ul className="filter-items">
                            {Object.keys(this.props.categories[categoryName]).map((categoryItem, index) => (
                                <li key={categoryItem + index}> 
                                    <label>   
                                        <input 
                                            type="checkbox" 
                                            name={categoryName} 
                                            value={categoryItem} 
                                            checked={this.props.categories[categoryName][categoryItem]} 
                                            onChange={this.props.handleCheckboxFilter} 
                                        />
                                    {categoryItem}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        )
    }
}

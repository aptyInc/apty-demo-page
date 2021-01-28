import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Home'
import Cart from './components/Cart'
import SearchBar from './components/SearchBar'
import Checkout from './components/Checkout'
import OrderSummary from './components/OrderSummary'

import data from "./data.json"

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: data.products
        }
    }

    searchProducts = (searchedProduct) => {
        if (searchedProduct === "") {
            this.setState({
                products: data.products
            })
        }
        else {
            this.setState({
                products: data.products.filter(product => product.title.toLowerCase().includes(searchedProduct.toLowerCase()))
            })
        }
    }

    render() {
        return (
            <div className="grid-container">
                <header >
                    <a href="/">Bmazon</a>
                    <SearchBar
                        searchProducts={this.searchProducts}
                    />
                    <a href="/">
                        {/* <img src="" ></img>     */}
                        Rohan
                    </a>
                    <a href="/cart">My Cart</a>
                </header>

                <main>
                    <Router>
                        <Switch>
                            <Route
                                exact
                                path="/"
                                component={() =>
                                    <Home
                                        products={this.state.products}
                                    />
                                }
                            />
                            <Route
                                exact
                                path="/cart"
                                component={Cart}
                            />
                            <Route
                                exact
                                path="/checkout"
                                component={Checkout}
                            />
                            <Route
                                exact
                                path="/orderSummary"
                                component={OrderSummary}
                            />
                        </Switch>
                    </Router>
                </main>

                <footer>
                    Footer Footer Footer
				</footer>
            </div>
        )
    }
}

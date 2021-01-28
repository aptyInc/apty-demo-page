import React, { Component } from 'react'
import Products from './components/Products'
import MiniCart from './components/MiniCart'
import FilterCategories from './components/FilterCategories'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: props.products, 
			search: "",
			categories: {},
			cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []
		}
	}

	componentDidMount() {
		// creates filters dynamically based on products

		this.state.products.forEach(product => {
			Object.keys(product.categories).forEach(categoryName => {
				product.categories[categoryName].forEach(categoryItem => {
					this.setState(prevState => ({
						categories: {
							...prevState.categories,
							[categoryName] : {
								...prevState.categories[categoryName],
								[categoryItem] : false,
							}
						}
					}))
				})
			})
		})
	}

	addToCart = (product) => {
		const cartItems = this.state.cartItems.slice()
		let alreadyInCart = false

		cartItems.forEach((cartItem) => {
			if(cartItem._id === product._id) {
				cartItem.count++
				alreadyInCart = true
			}
		})

		if (!alreadyInCart) {
			cartItems.push({...product, count: 1})
		}

		this.setState({
			cartItems: cartItems
		})

		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}

	removeFromCart = (product) => {
		const cartItems = this.state.cartItems.slice()
		const updatedItems = cartItems.filter(item => item._id !== product._id)
		this.setState({
			cartItems : updatedItems, 
		})
		localStorage.setItem('cartItems', JSON.stringify(updatedItems))
	}

	filterProducts = () => {
		var products   = this.props.products
		var categories = this.state.categories

		Object.keys(categories).forEach(categoryName => {
			var categoryItems = []
			Object.keys(categories[categoryName]).forEach(categoryItem => {
				if (categories[categoryName][categoryItem]) {
					categoryItems.push(categoryItem)
				}
			})

			if (categoryItems.length > 0) {
				products = products.filter(product => 
					product.categories[categoryName].filter(item => categoryItems.includes(item)).length > 0 
				)
			}
		})

		this.setState({
			products: products
		})
	}

	handleCheckboxFilter = (event) => {
		var categoryName = event.target.name
		var categoryItem = event.target.value
		var { checked } = event.target

		this.setState(prevState => ({ 
			categories: {
				...prevState.categories,
				[categoryName] : {
					...prevState.categories[categoryName],
					[categoryItem] : checked,
				}
			}
		}), function () {
			this.filterProducts()
		})
	}

	render() {
		return (
			<div className="content">
				<div className="filter-bar">
					<FilterCategories 
						products={this.props.products}
						categories={this.state.categories}
						handleCheckboxFilter={this.handleCheckboxFilter}
					/>
				</div>
				<div className="main">
					<div className="product-count">
						{this.state.products.length}  Products
					</div>
					<Products 
						products={this.state.products} 
						addToCart={this.addToCart}	
					/>
				</div>
				<div className="sidebar">
					<MiniCart 
						cartItems={this.state.cartItems} 
						removeFromCart={this.removeFromCart}	
					/>
				</div>	
			</div>
		)
	}
}

export default Home;

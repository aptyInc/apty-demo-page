import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

export default class Cart extends Component {
    constructor(props) {
        super(props)
        this.state={
            cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []
        }
    }

    removeFromCart = (product) => {
		const cartItems = this.state.cartItems.slice()
		const updatedItems = cartItems.filter(item => item._id !== product._id)
		this.setState({
			cartItems : updatedItems, 
		})
		localStorage.setItem('cartItems', JSON.stringify(updatedItems))
    }
    
    render() {
        const cartItems =  this.state.cartItems
        var total = cartItems.reduce((total, item) => (total + item.price * item.count), 0)
        return (
            <div className="main-cart">
                <Fade left cascade >
                <ul className="main-cart-items">
                    {cartItems.length === 0 ? 
                    // if cart empty, continue chopping button, back to home page
                        <div className="main-cart-header">Cart is Empty</div> :
                        <div className="main-cart-header"><b>My Cart </b>{" ("+cartItems.length} items)</div>
                    }
                    {cartItems.map(cartItem => (
                        <li key={cartItem._id}>
                            <div>
                                <img src={cartItem.image} alt={cartItem.title} />
                            </div>
                            <div>
                                <div className="main-cart-item-title">{cartItem.title}</div>
                                <div>{"Quantity:  " + cartItem.count}</div>
                                <div className="right">
                                    {"\u20B9  "+ cartItem.price} x {cartItem.count + "  "} 
                                    <button className="button" onClick={() => this.removeFromCart(cartItem)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                </Fade>
                {cartItems.length !==0 && (
                    <div className="main-cart-total">
                        <div className="row">
                            <span>{"Price (" + cartItems.length + " items) : "}</span> 
                            <span>{"\u20B9  " + total}</span>
                        </div>
                        <div className="row">
                            <span>{"Delivery Charges : "}</span> 
                            <span>{"\u20B9  120"}</span>
                        </div>
                        <div className="row final">
                            <span>{"Total : "}</span> 
                            <span>{"\u20B9  " + (total + 120) }</span>
                        </div>

                        <a href="/checkout">
                            <button className="button primary">
                                    Place Order
                            </button>
                        </a>
                    </div>
                )}
            </div>
        )
    }
}
import React, { Component } from 'react'

export default class OrderSummary extends Component {
    constructor(props) {
        super(props)
        this.state={
            cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []
        }
    }

    render() {
        var cartItems = []
        if (this.state.cartItems.length === 0 ) {
            alert("No items in cart to chekout!")
            this.props.history.push('/') 
        } else {
            cartItems =  this.state.cartItems
            var total = cartItems.reduce((total, item) => (total + item.price * item.count), 0)
        }

        return (
            <div className="order-summary">
                <div className="order-summary-header">
                    <strong>Order Placed!</strong>
                </div>
                <div className="order-summary-body">
                    <p>Your order number is #<b>3589767</b></p>

                    <ul className="order-summary-description">
                        <li className="row">
                            <span>{"Price (" + cartItems.length + " items) : "} </span>
                            <span>{"\u20B9  " + total}</span>
                        </li>
                        <li className="row">
                            <span>{"Delivery Charges : "} </span>
                            <span>{"\u20B9  120"}</span>
                        </li>
                        <li className="row total">
                            <span>{"Total : "}</span>
                            <span>{"\u20B9  " + (total + 120) }</span>
                        </li>
                    </ul>

                    <p>Estimated delivery <b>7 days</b></p>

                    <a href="/">
                        <button type="button" className="button primary">Continue shopping</button>
                    </a>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'

export default class MiniCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false,
        }
    }

    handleChange = (event) => {
        var { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    render() {
        const { cartItems } = this.props
        return (
            <div>
                {cartItems.length === 0 ? 
                    <div className="cart cart-header">Cart is Empty</div> :
                    <div className="cart cart-header">{cartItems.length} items in cart</div>
                }
                <div className="cart">
                    <Fade left cascade >
                    <ul className="cart-items">
                        {cartItems.map(cartItem => (
                            <li key={cartItem._id}>
                                <div>
                                    <img src={cartItem.image} alt={cartItem.title} />
                                </div>
                                <div>
                                    {/* <div>{cartItem.title}</div> */}
                                    <div className="right">
                                        {"\u20B9  "+ cartItem.price} x {cartItem.count + "  "} 
                                        <button className="button" onClick={() => this.props.removeFromCart(cartItem)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    </Fade>
                </div>
                {cartItems.length !==0 && (
                    <div className="cart"> 
                        <div className="total">
                            {"Sub-Total : \u20B9  " + cartItems.reduce((total, item) => (total + item.price * item.count), 0)}
                            <a href="/cart">
                                <button className="button primary" >
                                    View all Items
                                </button>
                            </a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

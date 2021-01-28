import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import userData from '../user.json'

export default class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state={
            userDetails: userData,
            // true if no address and new address needed
            // false if address there
            newAddrDiv: userData.address.length <= 0,  
            newAddr: {
                id:"",
                recipientName: "",
                recipientPhno: "",
                pincode: "",
                areaStreet: "",
                locality: "",
                city: "",
                state: "",
                landmark: "",
                addrType: ""
            },
            loginDiv: true,
            addressDiv: false,
            summaryDiv: false,
            paymentDiv: false,
            cartItems: JSON.parse(localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : []
        }
    }

    handleChange = (event) => {
        var { name, value } = event.target

        this.setState(prevState => ({
            userDetails: {
                ...prevState.userDetails,
                [name] : value,
            }
        }))
    }

    handleNewAddressChange = (event) => {
        var { name, value } = event.target

        this.setState(prevState => ({
            newAddr: {
                ...prevState.newAddr,
                [name] : value,
            },
        }))
    }

    removeFromCart = (product) => {
		const cartItems = this.state.cartItems.slice()
		const updatedItems = cartItems.filter(item => item.id !== product.id)
		this.setState({
			cartItems : updatedItems, 
		})
		localStorage.setItem('cartItems', JSON.stringify(updatedItems))
    }

    submitUserDetails = (event) => {
        event.preventDefault()

        this.setState({
            loginDiv: false,
            addressDiv: true,
        })
    }

    toggleAddNewAddress = (event) => {
        event.preventDefault()

        this.setState(prevState => ({
            newAddrDiv: !prevState.newAddrDiv,
        }))
    }

    addNewAddress = (event) => {
        this.setState(prevState => ({
            newAddr: {
                ...prevState.newAddr,
                id: "address" + prevState.userDetails.address.length
            }
        }), function () {

            this.setState(prevState => ({
                userDetails: {
                    ...prevState.userDetails,
                    address: [
                        ...prevState.userDetails.address,
                        prevState.newAddr,
                    ]
                }
            }))
        })
        
        this.toggleAddNewAddress(event)
    }

    submitDeliveryAddress = (event) => {
        event.preventDefault()

        this.setState({
            addressDiv: false,
            summaryDiv: true,
        })
    }

    submitOrderSummary = (event) => {
        event.preventDefault()

        this.setState({
            summaryDiv: false,
            paymentDiv: true,
        })
    }

    placeOrder = (event) => {
        event.preventDefault()
        this.props.history.push('/orderSummary') 

        // const order = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     address: this.state.address,
        //     cartItem: this.props.cartItems,
        // }
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
            <div className="checkout">
                <div className="checkout-container">
                    <div className="checkout-item">
                        <div className="checkout-header">
                            <span>1</span> user details 
                        </div>

                        {this.state.loginDiv && 
                        <Fade >
                            <div className="checkout-body">
                                <form onSubmit={this.submitUserDetails}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Name</label>
                                            <input 
                                                name="name" 
                                                type="text"
                                                value={this.state.userDetails.name}
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </li>
                                        <li>
                                            <label>Email</label>
                                            <input 
                                                name="email"
                                                type="email"
                                                value={this.state.userDetails.email}
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </li>
                                        <li>
                                            <label>10 digit Mobile Number</label>
                                            <input 
                                                name="phno"
                                                type="text"
                                                value={this.state.userDetails.phno}
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </li>
                                        <li>
                                            <button className="button primary" type="submit">Next</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </Fade>
                        }
                    </div>

                    <div className="checkout-item">
                        <div className="checkout-header">
                            <span>2</span> Delivery address
                        </div>

                        {this.state.addressDiv &&
                        <Fade>
                            <div className="checkout-body">
                                {!this.state.newAddrDiv
                                ?
                                    <form onSubmit={this.submitDeliveryAddress}>
                                        <ul className="form-container">
                                            {this.state.userDetails.address.map(addr => (
                                                <li className="row left" key={addr.id}>
                                                    <input 
                                                        id={addr.id}
                                                        name="bruh"
                                                        type="radio" 
                                                        // value="wallet"
                                                        // checked={this.state.userDetails.payment === 'wallet'}
                                                        required
                                                        // onChange={this.handleChange}
                                                    />
                                                    <label className="radio-label" htmlFor={addr.id}>
                                                        {addr.recipientName + "  " + addr.addrType + "  " + addr.recipientPhno}
                                                        <br />
                                                        {addr.areaStreet + ", " + addr.locality + ", " + addr.city + ", " + addr.state + ", "}
                                                        <b>{addr.pincode}</b>
                                                    </label>
                                                </li>
                                            ))}
                                            <li className="row">
                                                <button className="button primary" type="submit">Deliver here</button>
                                                <button className="button primary" onClick={this.toggleAddNewAddress} type="button">Add new address</button>
                                            </li>
                                        </ul>
                                    </form>
                                :
                                    <form onSubmit={this.addNewAddress}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Recipient Name</label>
                                            <input 
                                                name="recipientName" 
                                                type="text"
                                                required
                                                value={this.state.newAddr.recipientName}
                                                onChange={this.handleNewAddressChange}
                                            />
                                        </li>
                                        <li>
                                            <label>Recipient Phone number</label>
                                            <input 
                                                name="recipientPhno" 
                                                type="text"
                                                required
                                                value={this.state.newAddr.recipientPhno}
                                                onChange={this.handleNewAddressChange}
                                            />
                                        </li>
                                        <li>
                                            <label>Pincode</label>
                                            <input 
                                                name="pincode" 
                                                type="text"
                                                required
                                                value={this.state.newAddr.pincode}
                                                onChange={this.handleNewAddressChange}
                                            />
                                        </li>
                                        <li>
                                            <label>Area and Street</label>
                                            <textarea 
                                                name="areaStreet"
                                                type="text"
                                                required
                                                value={this.state.newAddr.areaStreet}
                                                onChange={this.handleNewAddressChange}
                                            />
                                        </li>
                                        <li>
                                            <label>Locality</label>
                                            <input 
                                                name="locality"
                                                type="text"
                                                required
                                                value={this.state.newAddr.locality}
                                                onChange={this.handleNewAddressChange}
                                            />
                                        </li>
                                        <li>
                                            <label>City/District/Town</label>
                                            <input 
                                                name="city"
                                                type="text"
                                                required
                                                value={this.state.newAddr.city}
                                                onChange={this.handleNewAddressChange}
                                            />
                                        </li>
                                        <li>
                                            <label>State</label>
                                            <input 
                                                name="state"
                                                type="text"
                                                required
                                                value={this.state.newAddr.state}
                                                onChange={this.handleNewAddressChange}
                                            />
                                        </li>
                                        <li>
                                            <label>Landmark (optional)</label>
                                            <input 
                                                name="landmark"
                                                type="text"
                                                // required
                                                value={this.state.newAddr.landmark}
                                                onChange={this.handleNewAddressChange}
                                            />
                                        </li>
                                        <li> 
                                            <label>Address Type</label>
                                            <br />
                                            <label className="radio-label">
                                            <input 
                                                name="addrType"
                                                type="radio"
                                                value="home"
                                                checked={this.state.newAddr.addrType === 'home'}
                                                required
                                                onChange={this.handleNewAddressChange}
                                            /> Home (All day delivery)
                                            </label>
                                            <br />
                                            <label className="radio-label">
                                            <input 
                                                name="addrType"
                                                type="radio"
                                                value="work"
                                                checked={this.state.newAddr.addrType === 'work'}
                                                required
                                                onChange={this.handleNewAddressChange}
                                            /> Work (Mon - Fri between 10AM and 5PM)
                                            </label>
                                        </li>
                                        <li className="row">
                                            <button className="button primary" type="submit">Add address</button>
                                            <button className="button primary" onClick={this.toggleAddNewAddress} type="button">Back</button>
                                        </li>
                                    </ul>
                                </form>
                                }   
                            </div>
                        </Fade>
                        }
                    </div>

                    <div className="checkout-item">
                        <div className="checkout-header">
                            <span>3</span> order summary
                        </div>

                        {this.state.summaryDiv &&
                        <Fade>
                            <div className="checkout-body">
                                <ul className="main-cart-items">
                                    <div className="main-cart-header">({cartItems.length} items)</div>
                                    {cartItems.map(cartItem => (
                                        <li key={cartItem.id}>
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
                                <button className="button primary" onClick={this.submitOrderSummary}>Continue</button>
                            </div>
                        </Fade>   
                        }
                    </div>

                    <div className="checkout-item">
                        <div className="checkout-header">
                            <span>4</span> payment option
                        </div>

                        {this.state.paymentDiv && 
                        <Fade >
                            <div className="checkout-body">
                                <form onSubmit={this.placeOrder}>
                                    <ul className="form-container">
                                        <li>
                                            <label className="radio-label">
                                            <input 
                                                name="payment" 
                                                type="radio"
                                                value="upi"
                                                checked={this.state.userDetails.payment === 'upi'}
                                                required
                                                onChange={this.handleChange}
                                            />
                                            UPI (PhonePe / Paytm / Google Pay)</label>
                                        </li>
                                        <li>
                                            <label className="radio-label">
                                            <input 
                                                name="payment"
                                                type="radio"
                                                value="wallet"
                                                checked={this.state.userDetails.payment === 'wallet'}
                                                required
                                                onChange={this.handleChange}
                                            />
                                            Wallets</label>
                                        </li>
                                        <li>
                                            <label className="radio-label">
                                            <input 
                                                name="payment"
                                                type="radio"
                                                value="card"
                                                checked={this.state.userDetails.payment === 'card'}
                                                required
                                                onChange={this.handleChange}
                                            />
                                            Credit / Debit / ATM Card</label>
                                        </li>
                                        <li>
                                            <label className="radio-label">
                                            <input 
                                                name="payment"
                                                type="radio"
                                                value="net-banking"
                                                checked={this.state.userDetails.payment === 'net-banking'}
                                                required
                                                onChange={this.handleChange}
                                            />
                                            Net Banking</label>
                                        </li>
                                        <li>
                                            <label className="radio-label">
                                            <input 
                                                name="payment"
                                                type="radio"
                                                value="cash-on-delivery"
                                                checked={this.state.userDetails.payment === 'cash-on-delivery'}
                                                required
                                                onChange={this.handleChange}
                                            />
                                            Cash on Delivery</label>
                                        </li>
                                        <li>
                                            <button className="button primary" type="submit">Pay</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </Fade>
                        }
                    </div>
                </div>

                {cartItems.length !==0 && (
                    <div className="checkout-total">
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
                    </div>
                )}
            </div>   
        )
    }
}

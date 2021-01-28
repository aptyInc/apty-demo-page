import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

export default class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null
        }
    }

    productDetails = (product) => {
        this.setState({
            product: product,
        })
    }

    closeProductDetails = () => {
        this.setState({
            product: null,
        })
    }

    render() {
        const { product } = this.state
        return (
            <div>
                <Fade bottom cascade>
                    <ul className="products">
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a 
                                        href={"#" + product._id} 
                                        onClick={() => this.productDetails(product)}
                                    > 
                                        <img src={product.image} alt={product.title} />
                                        <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {"\u20B9 " + product.price}
                                        </div>
                                        <button className="button primary" onClick={() => this.props.addToCart(product)}>
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {product && (
                    <Modal 
                        isOpen
                        onRequestClose={this.closeProductDetails}
                        ariaHideApp={false}
                    >
                        <Zoom>
                            <div>
                                <button className="close-product-details" onClick={this.closeProductDetails}>
                                    x
                                </button>
                                <div className="product-details">
                                    <div className="img">
                                        <img src={product.image} alt={product.title} />
                                    </div>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            Available sizes: {"  "}
                                            {product.categories.size.map(size => (
                                                <span key={size}>
                                                    {" "}
                                                    <button className="button">{size}</button>
                                                </span>
                                            ))}
                                        </p>
                                        <div className="product-price">
                                            <div>{"\u20B9 " + product.price}</div>
                                            <button className="button primary" onClick={() => {
                                                this.props.addToCart(product)
                                                this.closeProductDetails()
                                            }}>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        )
    }
}

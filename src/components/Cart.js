import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'

export default class Cart extends Component {

    render() {
        const { cartItems, totalBill, discount } = this.props;
        return (
            <div>
                <h4> <FontAwesomeIcon icon={faShoppingCart} /> Shopping Cart</h4>
                <div class="list-group">
                    <span class="list-group-item list-group-item-action active" aria-current="true">
                        <div class="d-flex w-100 justify-content-between">
                            {cartItems.length === 0 ?
                                (
                                    <div>
                                        <h5 class="mb-1">Your Cart Is Empty</h5>
                                    </div>
                                ) : (
                                    <div>
                                        <h5 class="mb-1">Your Cart Has {cartItems.length} Varieties of Books</h5>
                                    </div>
                                )}

                        </div>
                    </span>
                    {cartItems.map(item => {
                        return (
                            <span class="list-group-item list-group-item-action">
                                <div class="row">
                                    <div class="col-sm-2">
                                        <img src={item.image} class="card-img-top" alt={item.title} style={{ width: "50px" }} />
                                    </div>
                                    <div class="col-sm-10">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">{item.title}</h5>
                                            <small class="text-muted">
                                                <button class="btn btn-sm btn-danger"
                                                    onClick={() => this.props.removeFromCart(item)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </small>
                                        </div>
                                        <p class="mb-1">{item.price} x {item.count}</p>
                                        <small class="text-muted">
                                        </small>
                                    </div>
                                </div>


                            </span>
                        );
                    })}
                    {cartItems.length !== 0 ? (
                        <div>
                            <span class="list-group-item list-group-item-action bg-yellow" aria-current="true">
                                <div class="d-flex w-100 justify-content-between">
                                    <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1">Coupon Code</span>
                                        <input type="text"
                                            class="form-control"
                                            placeholder="Use 'ABC' to get 15%  discount"
                                            onChange={this.props.updateCouponCode}
                                            value={this.props.couponCode} />
                                    </div>
                                </div>
                            </span>
                            <span class="list-group-item list-group-item-action bg-yellow" aria-current="true">
                                <div class=" ">
                                    <div class="row">
                                        <div class="col-sm-5">
                                            <h5 class="mb-1">Total {totalBill}</h5>
                                        </div>
                                        <div class="col-sm-7 text-end">
                                            {discount !== "" ? (
                                                <small class="mb-1 ">{discount}  Discount Applied </small>
                                            ) : (
                                                <span />
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </span>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div >
        )
    }
}

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

export default class Books extends Component {
    render() {
        return this.props.books.map(book => {
            return (
                <div className="col-4 my-2">
                    <div class="card" >
                        <img src={book.image} class="card-img-top" alt={book.title} style={{}} />
                        <div class="card-body">
                            <h5 class="card-title"> {book.title}</h5>
                            <p class="card-text"> {book.description.substr(0, 70)}...</p>
                            <div class="row">
                                <div class="col-4">
                                    <span class=" ">Rs. {book.price}</span>
                                </div>
                                <div class="col-8">
                                    <button onClick={() => this.props.addToCart(book)} class="btn btn-warning float-end">
                                        <FontAwesomeIcon icon={faCartPlus} />
                                        &nbsp; Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }
}

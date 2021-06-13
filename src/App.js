import React, { Component } from 'react';
import Books from './components/Books';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Header from './components/Header';
import data from './data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      books: data.books,
      cartItems: [],
      couponCode: ""
    };
  }

  addToCart = (book) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item.id === book.id) {
        alreadyInCart = true;
        item.count++;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...book, count: 1 });
    }
    this.setState({ cartItems });

  }

  removeFromCart = (book) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({ cartItems: cartItems.filter(item => item.id !== book.id) });
  }

  updateCouponCode = (event) => {
    this.setState({ couponCode: event.target.value });
  }

  filterBooks = (event) => {
    if (event.target.value === "") {
      this.setState({
        category: event.target.value,
        books: data.books
      })
    } else {
      this.setState({
        category: event.target.value,
        books: data.books.filter(book => book.catagory === parseInt(event.target.value))
      })
    }

  }

  render() {
    return (
      <div className="App" >
        <Header />
        <div className="container">
          <div className="row">
            <div className="col">
              <Filter
                category={this.state.category}
                filterBooks={this.filterBooks}
                sortBooks={this.sortBooks}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 col-sm-12">
              <div className="row">
                <Books books={this.state.books} addToCart={this.addToCart} />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <Cart cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                updateCouponCode={this.updateCouponCode}
                couponCode={this.state.couponCode} />
            </div>
          </div>
        </div >
        <div>
          <footer class="footer mt-auto py-3 bg-light">
            <div class="container">
              <span class="text-muted">Test done by Chamikara Nayanajith</span>
            </div>
          </footer>
        </div>
      </div>
    );
  }


}

export default App;

import React, { Component } from 'react';
import Books from './components/Books';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Header from './components/Header';
import data from './data.json';
import { BOOK_TYPE } from "./constants";

class App extends Component {
  constructor() {
    super();
    this.state = {
      category: "",
      books: data.books,
      cartItems: (localStorage.getItem("cartItems") && JSON.parse(localStorage.getItem("cartItems")).length > 0) ? JSON.parse(localStorage.getItem("cartItems")) : [],
      cartData: {
        couponCode: "",
        totalBill: 0,
        discount: ""
      }

    };
  }
  componentDidMount() {
    (localStorage.getItem("cartItems") && JSON.parse(localStorage.getItem("cartItems")).length > 0) && this.countTotalBill(this.state.cartItems);
  }
  countTotalBill = (cartItems) => {
    let childrenBooksCount = 0,
      fictionBooksCount = 0,
      childrenBooksTotal = 0,
      fictionBooksTotal = 0,
      totalBill = 0,
      discount = "";

    cartItems.forEach((book) => {
      if (book.catagory === BOOK_TYPE.CHILDREN) {
        childrenBooksCount += book.count;
        childrenBooksTotal += book.count * book.price;
      }
      if (book.catagory === BOOK_TYPE.FICTION) {
        fictionBooksCount += book.count;
        fictionBooksTotal += book.count * book.price;
      }
    });

    if (this.state.cartData.couponCode === "ABC") {
      totalBill = (childrenBooksTotal + fictionBooksTotal) * 0.85;
      discount = "15%"
    } else {
      if (childrenBooksCount >= 5) {
        childrenBooksTotal = childrenBooksTotal * 0.9;
        discount = "10%"
      }

      if (childrenBooksCount === 10 && fictionBooksCount === 10) {
        totalBill = (childrenBooksTotal + fictionBooksTotal) * 0.95;
        discount = "10% + 5%"
      } else {
        totalBill = childrenBooksTotal + fictionBooksTotal;
      }
    }

    this.setState({ cartData: { ...this.state.cartData, totalBill, discount } });
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
    this.countTotalBill(cartItems);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  removeFromCart = (book) => {
    const cartItems = this.state.cartItems.slice();
    const newCartItems = cartItems.filter(item => item.id !== book.id);
    this.setState({ cartItems: newCartItems });
    this.countTotalBill(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));

  }

  updateCouponCode = (event) => {
    this.setState({ cartData: { ...this.state.cartData, couponCode: event.target.value } });
    setTimeout(
      function () {
        this.countTotalBill(this.state.cartItems);
      }
        .bind(this),
      300
    );

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
                couponCode={this.state.cartData.couponCode}
                totalBill={this.state.cartData.totalBill}
                discount={this.state.cartData.discount} />
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

import React, { Component } from "react";
import { storeProducts, detailProduct } from "../data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts() {
    let products = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      products = [...products, singleItem];
    });
    this.setState({ products });
  }

  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };

  handleDetail = (id) => {
    const detailProduct = this.getItem(id);
    this.setState({ detailProduct });
  };

  addToCart = (id) => {
    let products = [...this.state.products];
    const index = products.indexOf(this.getItem(id));
    const product = products[index];
    product.inCart = true;
    product.count = 1;
    let price = product.price;
    product.total = price;

    this.setState({ products, cart: [...this.state.cart, product] }, () => {
      this.addTotals();
    });
  };

  openModal = (id) => {
    const product = this.getItem(id);
    this.setState({ modalProduct: product, modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  increment = (id) => {
    let cart = [...this.state.cart];
    let product = cart.find((item) => item.id === id);
    const index = cart.indexOf(product);
    cart[index].count = cart[index].count + 1;
    cart[index].total = cart[index].price * cart[index].count;

    this.setState({ cart }, () => {
      this.addTotals();
    });
  };

  decrement = (id) => {
    let cart = [...this.state.cart];
    let product = cart.find((item) => item.id === id);
    const index = cart.indexOf(product);
    cart[index].count = cart[index].count - 1;
    if (cart[index].count <= 0) {
      this.removeItem(id);
    } else {
      cart[index].total = cart[index].price * cart[index].count;

      this.setState({ cart }, () => {
        this.addTotals();
      });
    }
  };

  removeItem = (id) => {
    let products = [...this.state.products];
    let cart = [...this.state.cart];
    cart = cart.filter((item) => item.id !== id);
    const index = products.indexOf(this.getItem(id));
    products[index].inCart = false;
    products[index].count = 0;
    products[index].total = 0;

    this.setState({ products, cart }, () => {
      this.addTotals();
    });
  };

  clearCart = () => {
    this.setState({ cart: [] }, () => {
      this.setProducts();
      this.addTotals();
    });
  };

  addTotals = () => {
    let { cart } = this.state;
    let subtotal = 0;
    cart.map((item) => (subtotal += item.total));
    let tax = subtotal * 0.1;
    tax = parseFloat(tax.toFixed(2));
    let total = subtotal + tax;

    this.setState({
      cartSubtotal: subtotal,
      cartTax: tax,
      cartTotal: total,
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

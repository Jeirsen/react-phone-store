import React, { Component } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import CartTotals from "./CartTotals";

import { ProductConsumer } from "../../Context/ProductContext";

class Cart extends Component {
  render() {
    return (
      <section>
        <ProductConsumer>
          {({
            cart,
            increment,
            decrement,
            removeItem,
            cartSubtotal,
            cartTax,
            cartTotal,
            clearCart,
          }) => {
            if (cart.length) {
              return (
                <React.Fragment>
                  <Title name="your" title="cart" />
                  <CartColumns />
                  <CartList
                    products={cart}
                    increment={increment}
                    decrement={decrement}
                    removeItem={removeItem}
                  />
                  <CartTotals
                    cartSubtotal={cartSubtotal}
                    cartTax={cartTax}
                    cartTotal={cartTotal}
                    clearCart={clearCart}
                    history={this.props.history}
                  />
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}

export default Cart;

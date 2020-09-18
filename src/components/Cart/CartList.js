import React from "react";
import CartItem from "./CartItem";

const CartList = ({ products, increment, decrement, removeItem }) => {
  return (
    <div className="container-fluid">
      {products.map((product) => {
        return (
          <CartItem
            key={product.id}
            product={product}
            increment={increment}
            decrement={decrement}
            removeItem={removeItem}
          />
        );
      })}
    </div>
  );
};

export default CartList;

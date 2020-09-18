import React from "react";
import { Link } from "react-router-dom";
import PayPalButton from "./PaypalButton";

const CartTotals = ({
  cartSubtotal,
  cartTax,
  cartTotal,
  clearCart,
  history,
}) => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger text-uppercase mb-3 px-5"
                onClick={() => clearCart()}
              >
                clear cart
              </button>
            </Link>
            <h5>
              <span className="text-title">
                subtotal: <strong>$ {cartSubtotal}</strong>
              </span>
            </h5>
            <h5>
              <span className="text-title">
                tax: <strong>$ {cartTax}</strong>
              </span>
            </h5>
            <h5>
              <span className="text-title">
                total: <strong>$ {cartTotal}</strong>
              </span>
            </h5>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartTotals;

import React, { Fragment, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartDetails = ({ cartItems, setCartItems }) => {
  const [complete, setComplete] = useState(false);

  function increaseQty(item) {
    if (item.product.stock != item.qty) {
      const updatedItems = cartItems.map((i) => {
        if (i.product._id == item.product._id) {
          i.qty++;
        }
        return i;
      });
      setCartItems(updatedItems);
    }
  }

  function decreaseQty(item) {
    if (item.qty > 1) {
      const updatedItems = cartItems.map((i) => {
        if (i.product._id == item.product._id) {
          i.qty--;
        }
        return i;
      });
      setCartItems(updatedItems);
    }
  }
  function removeItem(item) {
    const updatedItems = cartItems.filter((i) => {
      if (i.product._id !== item.product._id) {
        return true;
      }
    });
    setCartItems(updatedItems);
  }

  function placeOrder() {
    axios
      .post("http://localhost:8000/api/order", {
        cartItems: cartItems,
      })
      .then(function (response) {
        setCartItems([]);
        setComplete(true);
        toast.success("order Placed !");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return cartItems.length > 0 ? (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">
          Your Cart: <b>{cartItems.length} items</b>
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems.map((item) => (
              <Fragment key={item.product._id}>
                <hr />
                <div className="cart-item">
                  <div className="row">
                    <div className="col-4 col-lg-3">
                      <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                      />
                    </div>

                    <div className="col-5 col-lg-3">
                      <a href="#">{item.product.name}</a>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          className="btn btn-danger minus"
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </span>
                        <input
                          type="number"
                          className="form-control count d-inline"
                          value={item.qty}
                          readOnly
                        />
                        <span
                          className="btn btn-primary plus"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                        onClick={() => removeItem(item)}
                      ></i>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
            <hr />
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                </span>
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  $
                  {cartItems
                    .reduce(
                      (total, item) => total + item.product.price * item.qty,
                      0
                    )
                    .toFixed(2)}
                </span>
              </p>

              <hr />
              <button
                id="checkout_btn"
                onClick={placeOrder}
                className="btn btn-primary btn-block"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : !complete ? (
    <h2 className="text-danger fw-bold">Your cart is empty !</h2>
  ) : (
    <>
      
      <h2 className=" fw-bold text-success ">Order completed successfully !</h2>
      <p className="fw-bold">Thanks for using VS carts</p>
    </>
  );
};

export default CartDetails;

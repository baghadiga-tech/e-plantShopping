import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  updateQuantity
} from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // Get cart items from Redux
  const cart = useSelector((state) => state.cart.items);

  // Calculate overall cart total
  const calculateTotalAmount = () => {
    let total = 0;

    cart.forEach((item) => {
      const itemCost =
        parseFloat(item.cost) * item.quantity;

      total += itemCost;
    });

    return total.toFixed(2);
  };

  // Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // Placeholder checkout
  const handleCheckoutShopping = () => {
    alert(
      "Functionality to be added for future reference"
    );
  };

  // Increase quantity
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
      })
    );
  };

  // Decrease quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1
        })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Remove item
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  // Subtotal for single item
  const calculateTotalCost = (item) => {
    return (
      parseFloat(item.cost) *
      item.quantity
    ).toFixed(2);
  };

  return (
    <div className="cart-container">

      <h2>Your Cart</h2>

      <button onClick={handleContinueShopping}>
        Continue Shopping
      </button>

      {cart.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              className="cart-item"
              key={index}
            >
              <img
                src={item.image}
                alt={item.name}
                width="120"
              />

              <h3>{item.name}</h3>

              <p>
                Price: ${item.cost}
              </p>

              <p>
                Quantity:
                <button
                  onClick={() =>
                    handleDecrement(item)
                  }
                >
                  -
                </button>

                {item.quantity}

                <button
                  onClick={() =>
                    handleIncrement(item)
                  }
                >
                  +
                </button>
              </p>

              <p>
                Subtotal: $
                {calculateTotalCost(item)}
              </p>

              <button
                onClick={() =>
                  handleRemove(item.name)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <h2>
            Total: $
            {calculateTotalAmount()}
          </h2>

          <button
            onClick={
              handleCheckoutShopping
            }
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartItem;
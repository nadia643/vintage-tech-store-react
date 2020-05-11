import React, { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
//react-stripe-elements
import submitOrder from "../strapi/submitOrder";
 
export default function Checkout(props) {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);
  const history = useHistory();

  // state values
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    e.preventDefault();
  }

  if(cart.length < 1) return <EmptyCart />;
  return <section className="section form">
    <h2 className="section-title">Checkout</h2>
    <form className="checkout-form">
      <h3>
        Order total: <span>${total}</span>
      </h3>

      {/* single input */}
      <div className="form-control">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => {setName(e.target.value)}}/>
      </div>
      {/* end of single input */}

      {/* cart element */}
      <div className="stripe-input">
        <label htmlFor="card-element">Credit or Debit Card</label>
        <p className="stripe-info">
          Test using this credit card: <span>4242 4242 4242 4242</span>
          <br/>
          Enter any 5 digits for the zip code
          <br/>
          Enter any 3 digits for the CVC

        </p>
      </div>
      {/* end of cart element */}

      {/* STRIPE ELEMENTS */}
      {/* stripe errors */}
      {error && <p className="form-empty">{error}</p>}

      {/* empty value */}
      {isEmpty ? (
        <p className="form-empty">Please fill out name field</p>
        ) : ( 
        <button 
          type="submit" 
          onClick={handleSubmit}
          className="btn btn-primary btn-block"
          >
            Submit
          </button>
        )}

    </form>
  </section>
}

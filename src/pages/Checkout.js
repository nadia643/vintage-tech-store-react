import React, { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
import { CardElement, StripeProvider, Elements, injectStripe } from "react-stripe-elements";
import submitOrder from "../strapi/submitOrder";
 
function Checkout(props) {
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);
  const history = useHistory();

  // state values
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    showAlert({ msg: "Submitting order.... please wait" });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch(error => console.log(error));

      const { token } = response;
      if(token) {
        setError("");
        const { id } = token;
        

        let order = await submitOrder({ 
          name: name, 
          Total: total, 
          Items: cart,
          stripeTokenId: id,
          userToken: user.token
        });

      if(order) {
        showAlert({ msg: "Your order is complete" });
        clearCart();
        console.log(order);
        // history.push - navigate to home page once order is complete
        history.push("/");
        return;
        
      }
      else {
        showAlert({ msg: "There was an error with your order. Please try again!", type: "danger" })
      }
      } else {
        hideAlert();
        setError(response.error.message);
      }
      
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
      <CardElement className="card-element"></CardElement>
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

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_QmVxkiLSAPPJmpssTLBH410M00zxyZjeyW">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  )
}

export default StripeWrapper;
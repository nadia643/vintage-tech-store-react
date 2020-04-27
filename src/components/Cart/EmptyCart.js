import React from "react";
import { Link } from "react-router-dom";
import Cart from "../../pages/Cart";

export default function EmptyCart() {
  return <section className="empty-cart section">
    <h2>Empty cart...
      <Link to="/products" className="btn btn-primary">
        Fill it
      </Link>
    </h2>
  </section>
}

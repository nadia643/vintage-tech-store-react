import React from "react";
import { Link } from "react-router-dom";
import Hero from '../components/Hero';

export default function Home() {
  return <>
    <Hero>
      {/* this link button is the child we call in hero*/}
      <Link to="/products" className="btn btn-primary btn-hero">
        Our products
      </Link>
    </Hero>  
  </>;
}

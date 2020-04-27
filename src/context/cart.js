// cart context
import React from "react";
import localCart from "../utils/localCart";
import { createContext } from "react-router-dom";

const CartContext = createContext();

function CartProvider({ children }) {

    return <CartContext.Provider value="hello">
        { children }
    </CartContext.Provider>
}

export {CartContext, CartProvider};
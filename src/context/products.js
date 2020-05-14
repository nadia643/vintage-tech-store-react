import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../utils/URL";
import { featuredProducts, flattenProducts } from "../utils/helpers";

export const ProductContext = React.createContext();

//Provider, Consumer, useContext()

export default function ProductProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [featured, setFeatured] = useState([]);

    // extra state values
    const [sorted, setSorted] = useState([]);
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({
        search: "",
        category: 'all',
        shipping: false,
        price: "all" 
    });

    useEffect(() => {
        //while the http req is happening, the loading component is true until false below
        setLoading(true);
        axios
        .get(`${url}/products`)
        .then(response => {
            const featured = featuredProducts(flattenProducts(response.data));
            const products = flattenProducts(response.data);
            setProducts(products);
            setFeatured(featured);
            setLoading(false);
        });
        return () => {

        }
     
    }, []);

    const changePage = (index) => {
        console.log(index);
    }
    const updateFilters = e => {
        console.log(e);
        
    }
    
    return ( <ProductContext.Provider value={{ loading, products, featured }}>
                { children }
            </ProductContext.Provider>
    );
}

import React from 'react'
import { useParams, Link } from "react-router-dom";
import ProductList from './ProductList';


function Box() {
    let { id } = useParams();

    return (
        <div>
            <h1>ima box {id}</h1>
            <ProductList />
        </div>
    )
}

export default Box

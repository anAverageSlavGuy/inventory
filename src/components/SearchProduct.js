import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Requests from './Requests';
import ProductList from './ProductList';

function SearchProduct() {
    const [boxes, setBoxes] = useState([]);
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState([]);
    const [searchItemName, setSearchNewItemName] = useState('');

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = () => {
        (async () => {
            const boxes = await Axios.get(Requests.fetchBoxes);
            const products = await Axios.get(Requests.fetchBoxProductJoin);
            setBoxes(boxes.data);
            setItems(products.data);
        })();
    }

    const filterItemsByBox = (id) => {
        setFilter(items.filter(product => product.b_id == id));
    }

    const deleteItem = (id) => {
        (async () => {
            let url = replacePlaceholders(Requests.deleteProduct, { "%ID%": id });
            await Axios.delete(url);
            //filterItemsByBox();
        })();
    }

    const handleEmptyResult = () => {
        if (items.length == 0) {
            return <span className="text-light"> No products found.</span>
        }
    }

    const handleProductInput = (val) => {
        setSearchNewItemName(val);
    }

    return (
        <div>
            <h1 className="mt-2">Search Product</h1>
            <div className="content">
                <div className="input-group">
                    <input type="text" value={searchItemName} className="form-control" list="productList" placeholder="Product Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => handleProductInput(e.target.value)} />
                    <datalist id="productList">
                        {
                            items.map((item) => {
                                return <option key={item.bp_id} value={item.p_name}></option>
                            })
                        }
                    </datalist>
                    <button className="btn btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
            <div className="mt-4 pb-4 bg-dark">
                <div className="content">
                    <ProductList items={filter} onDelete={deleteItem} onEmptyResult={handleEmptyResult}/>
                </div>
            </div>
        </div>
    )
}

function replacePlaceholders(string, array) {
    //String must be like 'This is a string with %PLACEHOLDER%'
    //Array must be like { "%NAME%": "Mike", "%AGE%": "22" }
    let res = string.replace(/%\w+%/g, function (all) {
        return array[all] || all;
    });
    return res;
}

export default SearchProduct

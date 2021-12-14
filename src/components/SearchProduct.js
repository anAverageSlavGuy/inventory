import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Requests from './Requests';
import BoxList from './BoxList';

function SearchProduct() {
    const [boxes, setBoxes] = useState([]);
    const [items, setItems] = useState([]);
    const [box_product, setBoxProduct] = useState([]);

    const [filter, setFilter] = useState([]);
    const [searchItemName, setSearchNewItemName] = useState('');

    useEffect(() => {
        fetchAllItems();
    }, [])

    const fetchAllItems = () => {
        (async () => {
            let boxes = await Axios.get(Requests.fetchBoxes);
            let products = await Axios.get(Requests.fetchProducts);
            let box_product = await Axios.get(Requests.fetchBoxProductJoin);

            console.log(box_product.data);

            fetchBoxes([], boxes.data);
            setBoxes(boxes.data);
            setItems(products.data);
            setBoxProduct(box_product.data);
        })();
    }

    const fetchBoxes = (bp, b) => {
        for (var i in b) {
            let qty = bp.filter(item => item.b_id == b[i].id)
            b[i].quantity = qty.reduce(function (sum, el) {
                return sum + el.bp_quantity;
            }, 0);
        }

        setFilter(b.filter(item => item.quantity > 0));
    }

    const handleEmptyResult = () => {
        if (filter.length == 0) {
            return <span className="text-light"> It's not found in any box.</span>
        }
    }

    const handleProductInput = (val) => {
        setSearchNewItemName(val);
        console.log(box_product.filter(item => item.p_name == val));
        fetchBoxes(box_product.filter(item => item.p_name == val), boxes);
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
                                return <option key={item.id} value={item.name}></option>
                            })
                        }
                    </datalist>
                </div>
            </div>
            <div className="mt-4 pb-4 bg-dark">
                <div className="content">
                    {handleEmptyResult()}
                    <BoxList items={filter} canDelete={false} />
                </div>
            </div>
        </div>
    )
}

export default SearchProduct

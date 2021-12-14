import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Requests from './Requests';
import ProductList from './ProductList';
import $ from 'jquery';

function Products() {
    const [boxes, setBoxes] = useState([]);
    const [products, setProducts] = useState([]);
    const [box_product, setBoxProduct] = useState([]);

    const [filter, setFilter] = useState([]);

    const [selectedBox, setSelectedBox] = useState(null);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQty, setNewItemQty] = useState(1);
    const [boxValid, setBoxValid] = useState('valid');

    useEffect(() => {
        fetchAllItems();
    }, [])

    const fetchAllItems = () => {
        (async () => {
            let boxes = await Axios.get(replacePlaceholders(Requests.fetchBoxes, { "%PAGE%": "0" }));
            let products = await Axios.get(replacePlaceholders(Requests.fetchProducts, { "%PAGE%": "0" }));
            let box_product = await Axios.get(replacePlaceholders(Requests.fetchBoxProductJoin, { "%PAGE%": "0" }));
            setBoxes(boxes.data);
            setProducts(products.data);
            setBoxProduct(box_product.data);
        })();
    }

    const fetchProducts = () => {
        (async () => {
            let box_product = await Axios.get(replacePlaceholders(Requests.fetchBoxProductJoin, { "%PAGE%": "0" }));
            let products = await Axios.get(replacePlaceholders(Requests.fetchProducts, { "%PAGE%": "0" }));
            setBoxProduct(box_product.data);
            setProducts(products.data);
            console.log(products.data);
            console.log("set filters");
            setFilter(box_product.data.filter(item => item.b_id == selectedBox.id));
        })();
    }

    const filterItemsByBox = (id) => {
        setFilter(box_product.filter(item => item.b_id == id));
    }

    const addItem = () => {
        (async () => {
            if (!selectedBox) {
                setBoxValid('invalid');
                return false;
            }
            setBoxValid('valid');

            let productExists = products.find(product => product.name.replace(/\s/g, '').toLowerCase() == newItemName.replace(/\s/g, '').toLowerCase());
            if (productExists) {
                console.log('Product name already exists, checking box: '+selectedBox.id);
                let productInBox = filter.find(item => item.p_id == productExists.id);
                if(productInBox){
                    console.log('Product already exists in box: '+selectedBox.id + ' sum quantity');
                    console.log(productInBox);
                    let sum_qty = productInBox.bp_quantity + Number(newItemQty);
                    await Axios.patch(replacePlaceholders(Requests.updateProductQuantity, { "%ID%": productInBox.bp_id }), { quantity: sum_qty });
                } else {
                    console.log('Product does not exists in box: '+selectedBox.id + ' add it');
                    await Axios.post(Requests.addBoxProductJoin, { product_id: productExists.id, box_id: selectedBox.id, quantity: newItemQty });
                }
            } else {
                console.log('Product name does not exists, Add to products and add to box: '+selectedBox.id);
                let response = await Axios.post(Requests.addProduct, { name: newItemName });
                await Axios.post(Requests.addBoxProductJoin, { product_id: response.data.insertId, box_id: selectedBox.id, quantity: newItemQty }); 
            }

            setNewItemName('');
            setNewItemQty(1);
            fetchProducts();
        })();
    }

    const deleteItem = (id) => {
        (async () => {
            let url = replacePlaceholders(Requests.deleteBoxProduct, { "%ID%": id });
            await Axios.delete(url);
            fetchProducts();
        })();
    }

    const changeBox = (e) => {
        let box = boxes.find(item => item.id == e.target.value);
        let valid;
        if (box) {
            valid = 'valid';
            filterItemsByBox(box.id);
        } else {
            valid = 'invalid';
            setFilter([]);
        }
        setSelectedBox(box);
        setBoxValid(valid);
    }

    const handleEmptyResult = () => {
        if (selectedBox == null) {
            return <span className="text-light"> No box selected. </span>
        } else if (products.length == 0) {
            return <span className="text-light"> No products in this box.</span>
        }
    }

    const handleProductInput = (val) => {
        setNewItemName(val);
    }

    return (
        <div>
            <h1 className="mt-2">Products</h1>

            <div className="content">
                <select className={`form-select ${boxValid}`} aria-label="Default select example" onChange={(e) => changeBox(e)}>
                    <option selected>Select Box</option>
                    {
                        boxes.map((item) => {
                            return <option key={item.id} value={item.id}>{item.name}</option>
                        })
                    }
                </select>
            </div>
            <div className="content">
                <div className="input-group">
                    <input type="text" value={newItemName} className="form-control" list="productList" placeholder="Product Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => handleProductInput(e.target.value)} />
                    <input type="number" min="1" value={newItemQty} placeholder="Qty" className="form-control input-group-text quantity-selector" onChange={(e) => setNewItemQty(e.target.value)} />
                    <datalist id="productList">
                        {
                            products.map((item) => {
                                return <option key={item.id} value={item.name}></option>
                            })
                        }
                    </datalist>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => addItem()}>Add</button>
                </div>
            </div>
            <div className="mt-4 pb-4 bg-dark">
                <div className="content">
                    <ProductList items={filter} onDelete={deleteItem} onEmptyResult={handleEmptyResult} />
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

export default Products

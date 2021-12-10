import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Requests from './Requests';
import Product from './Product';
import $ from 'jquery';

function ProductList() {
    const [boxes, setBoxes] = useState([]);
    const [selectedBox, setSelectedBox] = useState(null);
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');
    const [newItemQty, setNewItemQty] = useState(5);
    const [boxValid, setBoxValid] = useState('valid');


    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = () => {
        (async () => {
            const boxes = await Axios.get(Requests.fetchBoxes);
            //const response = await Axios.get(Requests.fetchBoxProductJoin);
            setBoxes(boxes.data);
            //setItems(response.data);
        })();
    }

    const fetchItemsByBox = (id) => {
        (async () => {
            let url = replacePlaceholders(Requests.fetchProductsInBox, { "%BOX_ID%": id });
            const response = await Axios.get(url);
            console.log(response.data);
            setItems(response.data);
        })();
    }

    const addItem = () => {
        (async () => {
            if (!selectedBox) {
                setBoxValid('invalid');
                return false;
            }
            setBoxValid('valid');
            let response = await Axios.post(Requests.addProduct, { name: newItemName });
            await Axios.post(Requests.addBoxProductJoin, { product_id: response.data.insertId, box_id: selectedBox.id, quantity: newItemQty });
            setNewItemName('');
            setNewItemQty(5);
            fetchItemsByBox(selectedBox.id);
        })();
    }

    const deleteItem = (id) => {
        (async () => {
            let url = replacePlaceholders(Requests.deleteProduct, { "%ID%": id });
            await Axios.delete(url);
            fetchItemsByBox(selectedBox.id);
        })();
    }

    const changeBox = (e) => {
        let box = boxes.find(item => item.id == e.target.value);
        let valid;
        if (box) {
            valid = 'valid';
            fetchItemsByBox(box.id);
        } else {
            valid = 'invalid';
            setItems([]);
        }
        setSelectedBox(box);
        setBoxValid(valid);
    }

    const handleEmptyResult = () => {
        if (selectedBox == null) {
            return <span className="text-light"> No box selected. </span>
        } else if (items.length == 0) {
            return <span className="text-light"> No products in this box.</span>
        }
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
                    <input type="text" defaultValue={newItemName} className="form-control" list="productList" placeholder="Product Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setNewItemName(e.target.value)} />
                    <input type="number" min="1" defaultValue={newItemQty} placeholder="Qty" className="form-control input-group-text quantity-selector" onChange={(e) => setNewItemQty(e.target.value)} />
                    <datalist id="productList">
                        {
                            items.map((item) => {
                                return <option key={item.bp_id} value={item.p_name}></option>
                            })
                        }
                    </datalist>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => addItem()}>Add</button>
                </div>
            </div>
            <div className="mt-4 pb-4 bg-dark">
                <div className="content">
                    {handleEmptyResult()}
                    <ul className="list-group">
                        {
                            items.map((item) => {
                                return <li key={item.bp_id} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.p_name}
                                    <div className="box-actions">
                                        <span className="badge bg-dark rounded-pill">{item.bp_quantity}</span>
                                        <i className="bi bi-trash text-danger" onClick={() => deleteItem(item.p_id)}></i>
                                    </div>
                                </li>
                            })
                        }
                    </ul>


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

export default ProductList

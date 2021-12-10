import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Route, Routes, Link } from "react-router-dom";
import Requests from './Requests';

function BoxList() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = () => {
        (async () => {
            const products = await Axios.get(Requests.fetchBoxProduct);
            const boxes = await Axios.get(Requests.fetchBoxes);
            console.log(products.data);
            for (var i in boxes.data) {
                let qty = products.data.filter(product => product.box_id == boxes.data[i].id)
                boxes.data[i].quantity = qty.reduce(function (sum, el) {
                    return sum + el.quantity;
                }, 0);
                console.log(boxes.data[i]);
            }
            setItems(boxes.data);
        })();
    }

    const addItem = () => {
        (async () => {
            await Axios.post(Requests.addBox, { name: newItem });
            fetchItems();
        })();
    }

    const deleteItem = (id) => {
        (async () => {
            let url = replacePlaceholders(Requests.deleteBox, { "%ID%": id });
            await Axios.delete(url);
            fetchItems();
        })();
    }

    return (
        <div>
            <h1 className="mt-2">Boxes</h1>
            <div className="content">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Box Name" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setNewItem(e.target.value)} />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => addItem()}>Add</button>
                </div>
            </div>

            <div className="mt-4 pb-4 bg-dark">
                <div className="content">
                    <ul className="list-group">
                        {
                            items.map((item) => {
                                return <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <Link to={`/boxes/${item.id}`}> {item.name} </Link>
                                    <div className="box-actions">
                                        <span className="badge bg-dark rounded-pill">{item.quantity}</span>
                                        <i className="bi bi-trash text-danger" onClick={() => deleteItem(item.id)}></i>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div >
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


export default BoxList

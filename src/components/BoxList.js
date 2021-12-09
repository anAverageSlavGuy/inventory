import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Requests from './Requests';

function BoxList() {
    const [boxes, setBoxes] = useState([]);
    const [newBox, setNewBox] = useState('');

    useEffect(() => {
        fetchBoxes();
    }, [])

    const fetchBoxes = () => {
        (async () => {
            const response = await Axios.get(Requests.fetchBoxes);
            console.log(response.data);
            setBoxes(response.data);
        })();
    }

    const addBox = () => {
        (async () => {
            const response = await Axios.post(Requests.addBox, { name: newBox });
            fetchBoxes();
        })();
    }

    const deleteBox = (id) => {
        (async () => {
            const response = await Axios.delete(Requests.deleteBox + id);
            fetchBoxes();
        })();
    }

    return (
        <div>
            <div className="content">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e) => setNewBox(e.target.value)} />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => addBox()}>Add</button>
                </div>
            </div>

            <div className="content">
                <ul className="list-group">
                    {
                        boxes.map((box) => {
                            return <li key={box.id} className="list-group-item d-flex justify-content-between align-items-center">
                                {box.name}
                                <div className="box-actions">
                                    <span className="badge bg-primary rounded-pill">22</span>
                                    <i className="bi bi-trash text-danger" onClick={() => deleteBox(box.id)}></i>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div >
    )
}

export default BoxList

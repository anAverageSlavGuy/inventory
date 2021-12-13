import React from 'react'

function ProductList({items, onDelete, onEmptyResult}) {
    return (
        <>
            <ul className="list-group">
                {onEmptyResult()}
                {
                    items.map((item) => {
                        return <li key={item.bp_id} className="list-group-item d-flex justify-content-between align-items-center">
                            {item.p_name}
                            <div className="box-actions">
                                <span className="badge bg-dark rounded-pill">{item.bp_quantity}</span>
                                <i className="bi bi-trash text-danger" onClick={() => onDelete(item.p_id)}></i>
                            </div>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default ProductList

import { Link } from "react-router-dom";

function BoxList({items, onDelete}) {
    return (
        <>
            <ul className="list-group">
                {
                    items.map((item) => {
                        return <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <Link to={`/boxes/${item.id}`}> {item.name} </Link>
                            <div className="box-actions">
                                <span className="badge bg-dark rounded-pill">{item.quantity}</span>
                                <i className="bi bi-trash text-danger" onClick={() => onDelete(item.id)}></i>
                            </div>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

export default BoxList;

import { Link } from "react-router-dom";

function BoxList({items, onDelete, canDelete}) {
    return (
        <>
            <ul className="list-group">
                {
                    items.map((item) => {
                        return <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <Link to={`/boxes/${item.id}`}> {item.name} </Link>
                            <div className="box-actions">
                                <span className="badge bg-dark rounded-pill">{item.quantity}</span>
                                { canDelete && <i className="bi bi-trash text-danger" onClick={() => onDelete(item.id)}></i> }
                            </div>
                        </li>
                    })
                }
            </ul>
        </>
    )
}

BoxList.defaultProps = {
    onDelete: () => { alert()},
    canDelete: true
  };

export default BoxList;

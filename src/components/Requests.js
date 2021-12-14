export default {
    fetchBoxes: "/api/boxes?_p=%PAGE%&_size=100",
    fetchProducts: "/api/products?_p=%PAGE%&_size=100",
    fetchBoxProduct: "/api/box_product?_p=%PAGE%&_size=100",
    fetchBoxById: "/api/boxes/",
    fetchProductById: "/api/products/",
    addBox: "/api/boxes",
    addProduct: "/api/products",
    addBoxProductJoin: "/api/box_product",
    deleteBox: "/api/boxes/%ID%",
    deleteProduct: "/api/products/%ID%",
    deleteBoxProduct: "/api/box_product/%ID%",
    updateProductQuantity: "/api/box_product/%ID%",
    countProductsInBox: "/api/box_product?_groupby=box_id",
    fetchBoxProductJoin: "/api/xjoin?_join=b.boxes,_j,bp.box_product,_j,p.products&_on1=(b.id,eq,bp.box_id)&_on2=(p.id,eq,bp.product_id)&_p=%PAGE%&_size=100&_fields=bp.id,b.name,b.id,p.id,p.name,bp.quantity",
    fetchProductsInBox: "/api/xjoin?_join=b.boxes,_j,bp.box_product,_j,p.products&_on1=(b.id,eq,bp.box_id)&_on2=(p.id,eq,bp.product_id)&_p=%PAGE%&_size=100&_fields=bp.id,b.name,b.id,p.id,p.name,bp.quantity&_where=(b.id,eq,%BOX_ID%)"
}
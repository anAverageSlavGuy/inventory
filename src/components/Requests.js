export default {
    fetchBoxes: "/api/boxes",
    fetchProducts: "/api/products",
    fetchBoxById: "/api/boxes/",
    fetchProductById: "/api/products/",
    addBox: "/api/boxes",
    addProduct: "/api/products",
    fetchBoxProduct: "/api/box_product",
    addBoxProductJoin: "/api/box_product",
    deleteBox: "/api/boxes/%ID%",
    deleteProduct: "/api/products/%ID%",
    countProductsInBox: "/api/box_product?_groupby=box_id",
    fetchBoxProductJoin: "/api/xjoin?_join=b.boxes,_j,bp.box_product,_j,p.products&_on1=(b.id,eq,bp.box_id)&_on2=(p.id,eq,bp.product_id)&_fields=bp.id,b.name,b.id,p.id,p.name,bp.quantity",
    fetchProductsInBox: "/api/xjoin?_join=b.boxes,_j,bp.box_product,_j,p.products&_on1=(b.id,eq,bp.box_id)&_on2=(p.id,eq,bp.product_id)&_fields=bp.id,b.name,b.id,p.id,p.name,bp.quantity&_where=(b.id,eq,%BOX_ID%)"
}
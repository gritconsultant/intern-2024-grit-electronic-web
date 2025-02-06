import type { CartItemCreate, OrderAdd, OrderCreate, PasswordUpdate, ProductCartUpdate, Shipment, ShipmentCreate, ShipmentUpdate } from "~/models/product.model"
import { client } from "./httpClient"


// product
export const getProductList = () => {
    return client({
        url: "/product",
        method: "get",
    })
}

export const getProductById = (id: any) => {
    return client({
        url: `/product/${id}`,
        method: "get",
    })
}


// category
export const getCategoryList = () => {
    return client({
        url: "/category",
        method: "get",
    })
} 



// user
export const getUserInfo = () => {
    return client({
        url: "/user/info",
        method: "get",
    })
} 

export const updatePassword = (id: any, payload: PasswordUpdate) => {
    return client({
        url: `/user/${id}`,
        method: "patch",
        data: payload,
    })
}


// shipment
export const getShipmentId = () => {
    return client({
        url: "/shipment",
        method: "get",
    })
} 

export const getShipmentList = () => {
    return client({
        url: "/shipment",
        method: "get",
    })
} 

export const addShipment = (payload: ShipmentCreate) => {
    return client({
        url: `/shipment/create`,
        method: "post",
        data: payload,
    })
}

export const updateShipment = (id: any, payload: ShipmentUpdate) => {
    return client({
        url: `/shipment/${id}`,
        method: "patch",
        data: payload,
    })
}


// cart
export const getCart = () => {
    return client({
        url: "/cart", 
        method: "get",
    })
}

export const getCartItem = () => {
    return client({
        url: "/cartitem",
        method: "get",
    })
}

export const getCartItemByProductId = (productId: any) => {
    return client({
        url: "/cartitem",
        method: "get",
        params: { product_id: productId },
    })
}


export const addCartItem = (payload: CartItemCreate) => {
    return client({
        url: `/cartitem/create`,
        method: "post",
        data: payload,
    })
}

export const deleteCartItem = (cartItemId: number) => {
    return client({
        url: "/cartitem",
        method: "delete",
        data: { cart_item_id: cartItemId },
    })
}

export const updateCartItem = (id: any , payload: ProductCartUpdate) => {
    return client({
        url: `/cartitem/${id}`,
        method: "patch",
        data: payload,
    })
}


// order
export const getOrderList = () => {
    return client({
        url: "/order",
        method: "get",
    })
}

export const getOrderById = () => {
    return client({
        url: "/order",
        method: "get",
    })
}

export const addOrder = (payload: OrderCreate) => {
    return client({
        url: `/order/create`,
        method: "post",
        data: payload,
    })
}


// payment
export const getSystemBank = () => {
    return client({
        url: "/system",
        method: "get",
    })
}

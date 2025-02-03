import type { PasswordUpdate, Shipment, ShipmentCreate, ShipmentUpdate } from "~/models/product.model"
import { client } from "./httpClient"

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

export const getCategoryList = () => {
    return client({
        url: "/category",
        method: "get",
    })
} 

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

export const getShipmentId = (id: any) => {
    return client({
        url: `/shipment/${id}`,
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

export const getCartByID = (id: any) => {
    return client({
        url: `/cart/${id}`,
        method: "get",
    })
}
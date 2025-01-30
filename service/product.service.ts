import type { PasswordUpdate } from "~/models/product.model"
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

export const getPaymentList = () => {
    return client({
        url: "/payment",
        method: "get",
    })
} 
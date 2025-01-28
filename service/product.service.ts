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

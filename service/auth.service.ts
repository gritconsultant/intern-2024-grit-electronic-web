
import type { Login, Register } from "~/models/page.model"
import { client } from "./httpClient"
import type { UserInfo } from "~/models/product.model"

export const login = (payload: Login) => {
    return client({
        url: "/auth/login",
        method: "post",
        data: payload,
    })
}

export const register = (payload: Register) => {
    return client({
        url: "/user/create",
        method: "post",
        data: payload,
    })
}



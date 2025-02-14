import type { CartItemCreate,OrderCreate, OrderUpdate, Params, PasswordUpdate, PaymentCreate, ProductCartUpdate, ReviewCreate, ShipmentCreate, ShipmentUpdate, WishlistCreate } from "~/models/product.model"
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

export const getOrderlist = (params: Params) => {
    return client({
      url: "/order",
      method: "GET",
      params,
    });
  };



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


// payment

export const getPaymentList = () => {
    return client({
        url: "/payment",
        method: "get",
    })
} 
export const getPaymentId = () => {
    return client({
        url: "/payment",
        method: "get",

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

export const updateCartItem = (id: any, payload: ProductCartUpdate) => {
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

export const getOrderById = (id: any) => {
    return client({
        url: `/order/${id}`,
        method: "get",
    })
}

export const getOrderPending = () => {
    return client({
        url: "/order/pending",
        method: "get",
    })
}

export const getOrderPaid = () => {
    return client({
        url: "/order/paid",
        method: "get",
    })
}
export const getOrderShip = () => {
    return client({
        url: "/order/ship",
        method: "get",
    })
}

export const getOrderPrepare = () => {
    return client({
        url: "/order/prepare",
        method: "get",
    })
}

export const getOrderSuccess = () => {
    return client({
        url: "/order/success",
        method: "get",
    })
}

export const getOrderHistory = () => {
    return client({
        url: "/order/history",
        method: "get",
    })
}

export const updateOrder = (id: any, payload: OrderUpdate) => {
    console.log(payload)
    return client({
        url: `/order/${id}`,
        method: "patch",
        data: payload,
    })
}

export const addPayment = (payload: PaymentCreate) => {
    return client({
        url: "/payment/create",
        method: "post",
        data: payload,
    })
}

export const updatePayment = (id: any, payload: PaymentCreate) => {
    console.log(payload)
    return client({
        url: `/payment/${id}`,
        method: "patch",
        data: payload,
    })
}




// export const getOrderById = (orderId: number) => {
//     return client({
//         url: `/order/${orderId}`, // เพิ่ม orderId ไปใน URL
//         method: "get",
//     });
// };

// export const getOrderById = () => {
//     return client({
//         url: `/order`,
//         method: "get",
//     })
// }

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

export const addReview = (payload: ReviewCreate) => {
    return client({
        url: "/review/create",
        method: "post",
        data: payload,
    })
}


// fav
export const getFavorite = () => {
    return client({
        url: "/wish",
        method: "get",
    })
}

export const deleteFavorite = (id: any) => {
    return client({
        url:`/wish/${id}`,
        method: "delete",
    })
}

export const addFavorite = (payload: WishlistCreate) => {
    return client({
        url: "/wish/create",
        method: "post",
        data: payload,
    })
}


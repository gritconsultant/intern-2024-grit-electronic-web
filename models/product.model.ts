 export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
    category: ProductCategory;
    Review: ProductReview[];
    is_active: boolean;
    created_at: number;
    updated_at: number;
}

export interface ProductReview {
    id: number;
    rating: number;
    username: string;
    description: string;
}

export interface ProductCategory {
    id: number;
    name: string;
}
    
export interface ProductImage {
    id: number;
    ref_id: number;
    type: string;
    description: string;
}

export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface Payment {
    qrCodeUrl: string, // URL ของ QR Code
    bankName: string,
    accountNumber: string,
    accountName: string,
    totalAmount: number,
}

export interface Address {
    title: string;        // ชื่อสถานที่ (บ้าน, หอพัก ฯลฯ)
    name: string;         // ชื่อผู้รับ
    houseNo: string;      // บ้านเลขที่
    village: string;      // หมู่บ้าน/อาคาร
    subDistrict: string;  // ตำบล/แขวง
    district: string;     // อำเภอ/เขต
    province: string;     // จังหวัด
    postalCode: string;   // รหัสไปรษณีย์
    phone: string;        
  }

export interface ShippingStatus {
    text: string;
    date: string;
    isCurrent: boolean;
  }

  export interface User {
    ID: number;
    FirstName: string;
    LastName: string;
    Username: string;
    Password: string;
    Email: string;
    Phone: number;
    created_at: number;
    updated_at: number;
}

export interface UserInfo {
    ID: number;
    FirstName: string;
    LastName: string;
    Username: string;
    Password: string;
    Email: string;
    Phone: number;
    created_at: number;
    updated_at: number;
}

// password

export interface PasswordUpdate {
    // username: string;
    password: string;
    // email: string;
    // phone: number;
    // firstname: string;
    // lastname: string;

}

export interface PasswordRes {
    // username: string;
    password: string;
    // email: string;
    // phone: number;
    // firstname: string;
    // lastname: string;


// Shipment

}

export interface Shipment {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    zip_code: number;
    sub_district: string;
    district: string;
    province: string;
    status: string;
    created_at: number;
    updated_at: number;
}

export interface ShipmentId {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    zip_code: any;
    sub_district: string;
    district: string;
    province: string;
    status: string;
    created_at: number;
    updated_at: number;
}

export interface ShipmentCreate {
    ID: number;
    firstname: string;
    lastname: string;
    address: string;
    zip_code: any;
    sub_district: string;
    district: string;
    province: string;
    // status: string;
}
export interface ShipmentRes {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    zip_code: any;
    sub_district: string;
    district: string;
    province: string;
    // status: string;
}

export interface ShipmentUpdate {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    zip_code: number;
    sub_district: string;
    district: string;
    province: string;
    // status: string;
}

// Cart

export interface Cart {
    id: number;
    UserID: UserID[];
    CartItems: CartItem[];
    created_at: number;
    updated_at: number;
    image: string;
}

export interface UserID {
    id: number;
    username: string;
}

export interface CartItem {
    id: number;
    Product: ProductCart;
    total_product_amount: number;
    selected: boolean;
    image: string;
}
export interface CartResponse {
    data: CartItem[];
  }

export interface CartItems {
    id: number;
    cart_id: number;
    Product: ProductCart;
    total_product_amount: number;
    status: string;
    updated_at: number;
    created_at: number;
    selected: boolean;
    stock: number;
    image: string;
}

export interface CartItemCreate {
    product_id: number;
    total_product_amount: number;
}
export interface CartItemAdd {
    product_id: any;
    total_product_amount: number;
}
export interface CartItemRes {
    product_id: number;
    total_product_amount: number;
}

export interface ProductCart {
    id: number;
    name: string;
    price: number;
    image: string;
}

export interface ProductCartUpdate {
    // ID: number;
    // CartID: number;
    // ProductID: number;
    total_product_amount: number;
    // Status: string;
    // created_at: number;
    // updated_at: number;
}

export interface ProductCartRes {
    // ID: number;
    // CartID: number;
    // ProductID: number;
    total_product_amount: number;
    // Status: string;
    // created_at: number;
    // updated_at: number;
}


// order
export interface Order {
    id: number;
    user_id: number;
    username: string;
    status: string;
    total_amount: number;
    total_price: number;
    system_bank_id: number;
    payment_price: number;
    bank_name: string;
    account_name: string;
    account_number: number;
    payment_status: string;
    firstname: string;
    lastname: string;
    address: string;
    zip_code: number;
    sub_district: string;
    district: string;
    province: string;
    shipment_status: string;
    created_at: number;
    updated_at: number;
    selectedOrder: boolean;
}


export interface OrderCreate {
    shipment_id: number;
    payment_id: number;
    status: string;
}

export interface OrderAdd {
    shipment_id: any;
    payment_id: number;
    status: string;
}

export interface OrderRes {
    shipment_id: number;
    payment_id: number;
    status: string;
}

// export interface OrderById {
//     id: number;
//     User: number;
//     payment_id: number;
//     shipment_id: number;
//     total_amount: number;
//     total_price: number;
//     status: string;
//     created_at: number;
//     updated_at: number;
//     product_name: string; 
// }

// export interface Order {
//     id: number;
//     user_id: number;
//     username: string;
//     status: string;
//     total_amount: number;
//     total_price: number;
//     system_bank_id: number;
//     payment_price: number;
//     bank_name: string;
//     account_name: string;
//     account_number: number;
//     payment_status: string;
//     firstname: string;
//     lastname: string;
//     address: string;
//     zip_code: number;
//     sub_district: string;
//     district: string;
//     province: string;
//     shipment_status: string;
//     created_at: number;
//     updated_at: number;
//     selectedOrder: boolean;
// }

export interface OrderById {
    id: number;
    User: OrderUser;
    Payment: PaymentOrder;
    SystemBank: SystemBankOrder;
    Shipment: ShipmentOrder;
    total_amount: string;
    total_price: number;
    tracking_number: string;
    status: string;
    created_at: number;
    updated_at: number;
    product: string;
}

export interface OrderUser {
    id: number;
    firstname: string;
    lastname: string;
    phone: number;
}

export interface PaymentOrder {
    id: number;
    price: number;
    bank_name: string;
    account_name: string;
    account_number: number;
    status: string;
}

export interface SystemBankOrder {
    id: number;
    bank_name: string;
    account_name: string;
    account_number: number;
    description: string;
    image: string;
}

export interface ShipmentOrder {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    zip_code: number;
    sub_district: string;
    district: string;
    province: string;
}

// payment

export interface SystemBank {
    id: number;
    bank_name: string;
    account_name: string;
    account_number: number;
    description: string;
    image: string;
    is_active: boolean;
    created_at: number;
    updated_at: number;
}

export interface ImageSystemBank {
    id: number;
    ref_id: string;
    type: any;
    description: string;
}

export interface Params {
    page: number;
    size: number;
    search: string;
  }


  export interface ReviewCreate {
    description: string;
    rating: number;
    product_id: number;
  }

  export interface ReviewRes {
    description: string;
    rating: number;
    product_id: number;
  }

  export interface wishlistById {
    id: number;
    user: Userwish;
    product: Productwish;
    price_per_product: number;
    amount_per_product: number;
    created_at: number;  
    updated_at: number;
    isFavorite: boolean;

  }

  export interface Userwish {
    id: number;
    username: string;
  }

  export interface Productwish {
    id: number;
    name: string;
    description: string;
    price: number;
  }


  export interface WishlistCreate {
    user_id: number;
    product_id: number;
    isFavorite: boolean;
  }

  export interface WishlistRes {
    user_id: number;
    product_id: number;
    isFavorite: boolean;
  }
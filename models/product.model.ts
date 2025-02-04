 export interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    image: ProductImage;
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
    img: string;
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
  

export interface Order {
    id: string;
    date: string;
    total: number;
    deliveryDate: string;
    products: Product[];
    shippingStatus: ShippingStatus[];
    namerecipe: string;
    address: string;
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

export interface ShipmentCreate {
    firstname: string;
    lastname: string;
    address: string;
    zip_code: number;
    sub_district: string;
    district: string;
    province: string;
    // status: string;
}
export interface ShipmentRes {
    firstname: string;
    lastname: string;
    address: string;
    zip_code: number;
    sub_district: string;
    district: string;
    province: string;
    // status: string;
}

export interface ShipmentUpdate {
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
}

export interface UserID {
    id: number;
    username: string;
}

export interface CartItem {
    id: number;
    Product: Product[];
    total_product_amount: number;
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
}

export interface ProductCart {
    id: number;
    name: string;
    price: number;
}

export interface ProductCartUpdate {
    // ID: number;
    // CartID: number;
    // ProductID: number;
    TotalProductAmount: number;
    // Status: string;
    // created_at: number;
    // updated_at: number;
}

export interface ProductCartRes {
    // ID: number;
    // CartID: number;
    // ProductID: number;
    TotalProductAmount: number;
    // Status: string;
    // created_at: number;
    // updated_at: number;
}
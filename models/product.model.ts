export interface Product {
    id: number;
    name: string;
    detail: string;
    price: number;
    amount: number;
    img: string;
}

export interface Category {
    id: number;
    name: string;
    img: string;
}

export interface paymentInfo {
    qrCodeUrl: string, // URL ของ QR Code
    bankName: string,
    accountNumber: string,
    accountName: string,
    totalAmount: number,
}

export interface Address {
    title: string;
    name: string;
    address: string;
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
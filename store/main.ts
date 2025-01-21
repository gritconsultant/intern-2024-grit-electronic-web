import { defineStore } from 'pinia';

interface State {
    token : string
    userId : string
    cartAction : boolean
    favouriteAction : boolean
    notificationAction : boolean
    paymentAction : boolean
    reviewAction : boolean
    addressAction : boolean
    cartItems: any[]; // เพิ่ม cartItems สำหรับเก็บสินค้าที่อยู่ในตะกร้า
}

export const useIndexStore = defineStore('index',{
    state: (): State => ({
        token:'',
        userId:'',
        cartAction: false,
        favouriteAction: false,
        notificationAction: false,
        paymentAction: false,
        reviewAction: false,
        addressAction: false,
        cartItems: [], // สร้าง array สำหรับตะกร้าสินค้า
    }),
    actions: {
        addToCart(item: any) {
          const existingItem = this.cartItems.find((i) => i.id === item.id);
          if (existingItem) {
            existingItem.selectedAmount += item.selectedAmount;
          } else {
            this.cartItems.push(item);
        }
      },
    },
  });
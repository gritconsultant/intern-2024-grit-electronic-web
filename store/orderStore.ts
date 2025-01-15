import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [],
    selectedOrderId: null as string | null,
    selectedProducts: [] as Array<{ id: number; name: string; price: number }>, // กำหนดประเภทที่ชัดเจน
  }),
  actions: {
    setOrderAndProducts(orderId: string, products: Array<{ id: number; name: string; price: number }>) {
      this.selectedOrderId = orderId;
      this.selectedProducts = products;
    },
  },
});

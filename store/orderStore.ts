import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as Array<{
      id: string;
      date: string;
      products: Array<{
        id: number;
        name: string;
        price: number;
        img: string; // เพิ่ม img
      }>;
    }>,
    selectedOrderId: null as string | null,
    selectedProducts: [] as Array<{
      id: number;
      name: string;
      price: number;
      img: string; // เพิ่ม img
      reason?: string; // เพิ่ม เหตุผม
      files?: File[]; // เพิ่ม files สำหรับแนบไฟล์
    }>,
    returnedProducts: [] as Array<{
      id: number;
      name: string;
      price: number;
      img: string; // เพิ่ม img
      reason: string; // เหตุผลในการคืนสินค้า
      files: Array<{ name: string; preview: string }>; // รายละเอียดไฟล์ที่แนบ
    }>,
  }),
  actions: {
    setOrderAndProducts(
      orderId: string,
      products: Array<{ id: number; name: string; price: number; img: string }>
    ) {
      this.selectedOrderId = orderId;
      this.selectedProducts = products.map((product) => ({
        ...product,
        reason: "", // ตั้งค่าเริ่มต้นสำหรับเหตุผล
        files: [], // ตั้งค่าเริ่มต้นสำหรับไฟล์แนบ
      }));
    },

    // เพิ่มสินค้าในประวัติการคืนสินค้า
    addToReturnHistory(product: {
      id: number;
      name: string;
      price: number;
      img: string;
      reason: string;
      files: Array<{ name: string; preview: string }>;
    }) {
      this.returnedProducts.push(product);
    },

    // ลบสินค้าออกจากรายการคืนสินค้า
    removeSelectedProduct(productId: number) {
      this.selectedProducts = this.selectedProducts.filter((p) => p.id !== productId);
    },
  },
});

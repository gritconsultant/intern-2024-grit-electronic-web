import service from "~/service";
import { useIndexStore } from "~/store/main";

const store = useIndexStore();

export const verify = async () => {
    await service.product.getUserInfo()
    .then((resp: any) => {
      const data = resp.data.data;
      console.log(data)
      store.$state.userId = data.id;
      store.$state.token = data.token;
    })
    .catch((error: any) => {
       console.error(error);
     })
     .finally(() => {});
}

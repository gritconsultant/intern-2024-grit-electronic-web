import { defineStore } from 'pinia';

interface State {
    token : string
    userId : string
    cartAction : boolean
    favouriteAction : boolean
    notificationAction : boolean
    paymentAction : boolean
}

export const useIndexStore = defineStore('index',{
    state: (): State => ({
        token:'',
        userId:'',
        cartAction: false,
        favouriteAction: false,
        notificationAction: false,
        paymentAction: false,
    })
})
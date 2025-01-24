export default defineNuxtRouteMiddleware((to, from) => {
    const refToken = useStatefulCookie(`token`)
    if (!refToken.value){
        return navigateTo(`/login`)
    }

})

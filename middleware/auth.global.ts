export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith("/admin")) {
    return;
  }
  const loggedIn = useUserSession().loggedIn;
  if (!loggedIn.value && to.path !== "/admin/login") {
    return navigateTo("/admin/login");
  }
  if (loggedIn.value && to.path === "/admin/login") {
    return navigateTo("/admin");
  }
});

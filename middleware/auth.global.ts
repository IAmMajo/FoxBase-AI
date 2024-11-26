export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith("/admin")) {
    return;
  }
  const { loggedIn } = useUserSession();
  console.log(loggedIn);
  if (!loggedIn.value && to.path !== "/admin/login") {
    return navigateTo("/admin/login");
  }
  if (loggedIn.value && to.path === "/admin/login") {
    return navigateTo("/admin");
  }
});

import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    AOS.init({
      once: true, // Animation spielt sich nur einmal ab, weil das sonst
      // zu viel werden könnte.
    });
  });
});

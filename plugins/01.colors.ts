export default defineNuxtPlugin(async () => {
  const { data } = await useFetch<Record<string, string>>("/api/settings");
  if (!import.meta.client) {
    return;
  }

  // Light / Dark Mode Switch anzeigen
  const toggleBtn = document.getElementById("toggle-button");
  const navState = data.value?.showPaletteSwitch;

  if (navState == "false") {
    console.log("Nav State = false");
    toggleBtn?.classList.add("display-none");
    toggleBtn?.classList.remove("light-dark-switch");
  }

  if(navState == "true") {
    console.log("Nav State = true");
    toggleBtn?.classList.remove("display-none");
    toggleBtn?.classList.add("light-dark-switch");
  }

  const documentStyle = document.documentElement.style;
  documentStyle.setProperty("--dark-primary", data.value?.colorPrimary || null);
  documentStyle.setProperty(
    "--dark-bg-secondary",
    data.value?.colorBackgroundSecondary || null,
  );
  documentStyle.setProperty(
    "--dark-text-primary",
    data.value?.colorTextPrimary || null,
  );
  documentStyle.setProperty(
    "--dark-text-secondary",
    data.value?.colorTextSecondary || null,
  );
  documentStyle.setProperty(
    "--light-primary",
    data.value?.colorLightPrimary || null,
  );
  documentStyle.setProperty(
    "--light-bg-secondary",
    data.value?.colorLightBackground || null,
  );
  documentStyle.setProperty(
    "--light-text-primary",
    data.value?.colorLightTextPrimary || null,
  );
  documentStyle.setProperty(
    "--light-text-secondary",
    data.value?.colorLightTextSecondary || null,
  );
});

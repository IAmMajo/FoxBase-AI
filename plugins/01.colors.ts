export default defineNuxtPlugin(async () => {
  const { data } = await useFetch<Record<string, string>>("/api/settings");
  if (!import.meta.client) {
    return;
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
});

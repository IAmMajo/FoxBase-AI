/*
 * Copyright 2025 Alina Marie Hartmann, Max Josef Overlack, Nils Paaßen,
 * Nico Puelacher, Hanna Steffen, Lena Weuste
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

  if (navState == "true") {
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

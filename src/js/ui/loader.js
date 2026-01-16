// utils/loader.js
export function showLoader() {
  const loader = document.getElementById("loading-spinner");
  if (loader) loader.classList.remove("hidden");
}

export function hideLoader() {
  const loader = document.getElementById("loading-spinner");
  if (loader) loader.classList.add("hidden");
}

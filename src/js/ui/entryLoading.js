class EntryLoading {
  static loading() {
    const loader = document.getElementById("app-loading-overlay");
    if (!loader) return;
    loader.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 999999999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      transition: opacity 0.7s;
    `;

    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    });
  }
}

export default EntryLoading;

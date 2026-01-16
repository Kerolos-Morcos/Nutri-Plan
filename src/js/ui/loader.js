class SpinnerLoader {
  constructor(loaderId = "loading-spinner") {
    this.loader = document.getElementById(loaderId);
  }

  show() {
    if (this.loader) this.loader.classList.remove("hidden");
  }

  hide() {
    if (this.loader) this.loader.classList.add("hidden");
  }
}

export default SpinnerLoader;

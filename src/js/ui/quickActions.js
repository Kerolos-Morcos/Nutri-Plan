class QuickActionsUI {
  constructor() {
    this.logMealBtn = document.querySelector(".quick-log-btn:nth-of-type(1)");
    this.scanProductBtn = document.querySelector(
      ".quick-log-btn:nth-of-type(2)"
    );

    this.attachEvents();
  }

  attachEvents() {
    if (this.logMealBtn) {
      this.logMealBtn.addEventListener("click", () => {
        window.location.hash = "#meals";
      });
    }

    if (this.scanProductBtn) {
      this.scanProductBtn.addEventListener("click", () => {
        window.location.hash = "#products-section";
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new QuickActionsUI();
});

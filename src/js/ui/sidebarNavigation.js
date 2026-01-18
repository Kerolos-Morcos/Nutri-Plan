class NavigationUI {
  constructor() {
    // Sections
    this.mealCategories = document.getElementById("meal-categories-section");
    this.mealsSection = document.getElementById("all-recipes-section");
    this.searchFiltersSection = document.getElementById(
      "search-filters-section"
    );
    this.mealDetailsSection = document.getElementById("meal-details");

    this.productsSection = document.getElementById("products-section");
    this.foodLogSection = document.getElementById("foodlog-section");

    // Header
    this.header = document.getElementById("header");

    // Nav links
    this.navLinks = document.querySelectorAll(".nav-link");

    // Events
    this.addClickEvents();

    // Load correct section on refresh
    this.loadFromHash();
  }

  addClickEvents() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const target = link.getAttribute("href");

        // change URL
        window.location.hash = target;

        this.openSection(target);
        this.setActiveLink(target);
      });
    });
  }

  loadFromHash() {
    const hash = window.location.hash || "#meals";

    this.openSection(hash);
    this.setActiveLink(hash);
  }

  openSection(target) {
    // hide everything first
    this.hideAll();

    // meals
    if (target === "#meals") {
      this.mealCategories.classList.remove("hidden");
      this.mealsSection.classList.remove("hidden");
      this.searchFiltersSection.classList.remove("hidden");

      this.setHeader(
        "Meals & Recipes",
        "Discover delicious and nutritious recipes tailored for you"
      );
    }

    // products
    if (target === "#products-section") {
      this.productsSection.classList.remove("hidden");

      this.setHeader(
        "Products Scanner",
        "Scan packaged foods by name or barcode"
      );
    }

    // food log
    if (target === "#foodlog-section") {
      this.foodLogSection.classList.remove("hidden");

      this.setHeader("Food Log", "Track your daily nutrition and food intake");
    }
  }

  hideAll() {
    this.mealCategories.classList.add("hidden");
    this.mealsSection.classList.add("hidden");
    this.searchFiltersSection.classList.add("hidden");
    this.productsSection.classList.add("hidden");
    this.foodLogSection.classList.add("hidden");
    this.mealDetailsSection.classList.add("hidden");
  }

  setActiveLink(target) {
    this.navLinks.forEach((link) => {
      link.classList.remove("bg-emerald-50", "text-emerald-700");
      link.classList.add("text-gray-600");

      if (link.getAttribute("href") === target) {
        link.classList.add("bg-emerald-50", "text-emerald-700");
      }
    });
  }

  setHeader(title, text) {
    if (!this.header) return;

    this.header.querySelector("h1").textContent = title;
    this.header.querySelector("p").textContent = text;
  }
}

export default NavigationUI;

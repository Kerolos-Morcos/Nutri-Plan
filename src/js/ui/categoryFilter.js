import GetProductsByCategory from "../api/fetchProductByCategory.js";
import RenderProducts from "./renderProducts.js";
import SpinnerLoader from "./loader.js";
import GetProductCategories from "../api/fetchProductCategories.js";
import NutriScoreFilter from "./nutriScoreFilter.js";

class CategoryFilter {
  constructor() {
    this.categoryContainer = document.getElementById("product-categories");
    this.productsContainer = document.getElementById("products-grid");
    this.loader = new SpinnerLoader();
    this.renderer = new RenderProducts();
    this.categoryButtons = [];
  }

  async initializeCategories() {
    this.loader.show();
    const categories = await GetProductCategories.fetchAllCategories();
    this.loader.hide();

    if (categories && categories.length > 0) {
      this.renderCategoryButtons(categories);
      this.ClickEachCategory();
    }
  }

  renderCategoryButtons(categories) {
    const gradients = [
      "from-amber-500 to-orange-500",
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-sky-400 to-blue-500",
      "from-red-500 to-rose-500",
      "from-green-500 to-emerald-500",
      "from-amber-600 to-yellow-500",
      "from-red-600 to-rose-600",
      "from-cyan-500 to-blue-600",
      "from-orange-500 to-red-500",
    ];

    const icons = [
      "fa-wheat-awn",
      "fa-bottle-water",
      "fa-cookie",
      "fa-cheese",
      "fa-apple-whole",
      "fa-carrot",
      "fa-bread-slice",
      "fa-drumstick-bite",
      "fa-snowflake",
      "fa-jar",
    ];

    this.categoryContainer.innerHTML = categories
      .map((category, index) => {
        const gradient = gradients[index % gradients.length];
        const icon = icons[index % icons.length];
        return `
          <button
            class="product-category-btn flex-shrink-0 px-5 py-3 bg-gradient-to-r ${gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            data-category="${category.name || category}"
          >
            <i class="fa-solid ${icon} mr-2"></i>${category.name || category}
          </button>
        `;
      })
      .join("");

    this.categoryButtons = document.querySelectorAll(".product-category-btn");
  }

  ClickEachCategory() {
    this.categoryButtons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const category = btn.dataset.category;

        this.renderer.container.style.display = "none";
        this.renderer.emptyContainer.style.display = "none";

        this.renderer.loader.show();

        const data = await GetProductsByCategory.fetchProductsByCategory(
          category
        );
        this.renderer.loader.hide();

        const nutriFilter = new NutriScoreFilter();
        nutriFilter.clickedFilterBtn();

        this.renderer.renderProductsFunction({
          products: data.results,
          pagination: data.pagination,
          category: category,
        });
        nutriFilter.setAllProducts(data.results);
      });
    });
  }
}

export default CategoryFilter;

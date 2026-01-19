import RenderAllMeals from "./ui/renderAllMeals.js";
import RenderCategories from "./ui/renderCategories.js";
import RenderAreas from "./ui/renderAreas.js";
import EntryLoading from "./ui/entryLoading.js";
import SearchUI from "./ui/searchUI.js";
import NavigationUI from "./ui/sidebarNavigation.js";
import ProductSearchUI from "./ui/productSearchUI.js";
import NutriScoreFilter from "./ui/nutriScoreFilter.js";
import CategoryFilter from "./ui/categoryFilter.js";
import ViewToggle from "./ui/viewToggle.js";
import FoodLogUI from "./ui/foodLogUI.js";

class App {
  constructor() {
    EntryLoading.loading();
    this.appFunctions();
  }
  async appFunctions() {
    // Navigation
    new NavigationUI();

    // Change View
    ViewToggle.changeView();

    // Fetch Meals Categories
    const categories = new RenderCategories();
    categories.renderCategoriesFunction();

    // Fetch Meals Areas
    const areas = new RenderAreas();
    areas.renderAreasFunction();

    // Fetch All Meals
    const meals = new RenderAllMeals();
    meals.renderAllMealsFunction();

    // Search Meals
    const searchFeature = new SearchUI();
    searchFeature.search();

    const productSearch = new ProductSearchUI();
    productSearch.attachEventListeners();

    // Initialize Nutri-Score Filter
    const nutriScoreFilter = new NutriScoreFilter();
    nutriScoreFilter.clickedFilterBtn();

    // Initialize Category Filter
    const categoryFilter = new CategoryFilter();
    await categoryFilter.initializeCategories();

    // FoodLog Page
     new FoodLogUI();
  }
}

new App();

import RenderAllMeals from "./ui/renderAllMeals.js";
import RenderCategories from "./ui/renderCategories.js";
import RenderAreas from "./ui/renderAreas.js";
import EntryLoading from "./ui/entryLoading.js";

class App {
  constructor() {
    EntryLoading.loading();
    this.appFunctions();
  }
  appFunctions() {
    // Fetch Meals Categories
    const categories = new RenderCategories();
    categories.renderCategoriesFunction();

    // Fetch Meals Areas
    const areas = new RenderAreas();
    areas.renderAreasFunction();

    // Fetch All Meals
    const meals = new RenderAllMeals();
    meals.renderAllMealsFunction();
  }
}

new App();

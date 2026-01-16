import Loader from "./ui/loadingSpinner.js";
import RenderAllMeals from "./ui/renderAllMeals.js";
import RenderCategories from "./ui/renderCategories.js";
import RenderMealsAreas from "./ui/renderMealsAreas.js";

class App {
  constructor() {
    Loader.loading();
    this.appFunctions();
  }
  appFunctions() {
    // Fetch Meals Categories
    const categories = new RenderCategories();
    categories.renderCategoriesFunction();

    // Fetch Meals Areas
    const areas = new RenderMealsAreas();
    areas.renderMealsAreasFunction();

    // Fetch All Meals
    const meals = new RenderAllMeals();
    meals.renderAllMealsFunction();
  }
}

new App();

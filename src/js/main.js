import Loader from "./ui/loadingSpinner.js";
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
  }
}

new App();

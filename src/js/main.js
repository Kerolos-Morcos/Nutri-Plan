import Loader from "./ui/loadingSpinner.js";
import RenderCategories from "./ui/renderCategories.js";

class App {
  constructor() {
    Loader.loading();
    this.appFunctions();
  }
  appFunctions() {
    const categories = new RenderCategories();
    categories.renderCategoriesFunction();
  }
}

new App();

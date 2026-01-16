import SearchFeature from "../api/searchFeature.js";
import RenderAllMeals from "./renderAllMeals.js";
import SpinnerLoader from "./loader.js";

class SearchUI {
  search() {
    const input = document.getElementById("search-input");
    const loader = new SpinnerLoader();
    input.addEventListener("input", async () => {
      const query = input.value.trim();
      loader.show();
      const mealsContainer = document.getElementById("recipes-grid");
      mealsContainer.innerHTML = "";
      let meals, countText;
      if (query) {
        meals = await SearchFeature.searchMeals(query);
        countText = `Showing ${meals.length} recipes for "${query}"`;
      }
      const allMeals = new RenderAllMeals();
      await allMeals.renderAllMealsFunction(meals, countText);
      loader.hide();
    });
  }
}

export default SearchUI;

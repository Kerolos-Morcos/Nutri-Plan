import FetchMealsByCategories from "../api/fetchMealsByCategory.js";
import { hideLoader, showLoader } from "./loader.js";
import RenderAllMeals from "./renderAllMeals.js";

class ActiveCategoryBtns {
  static activeCategoryBtnsFunction() {
    const container = document.getElementById("categories-grid");
    const cards = container.querySelectorAll(".category-card");
    cards.forEach((card) => {
      card.addEventListener("click", async () => {
        // Filter by category
        const category = card.dataset.category;
        const mealsContainer = document.getElementById("recipes-grid");
        mealsContainer.innerHTML = "";
        showLoader();
        const meals = await FetchMealsByCategories.fetchMealsByCategoryFunction(
          category
        );
        await new RenderAllMeals().renderAllMealsFunction(meals);
        hideLoader();
      });
    });
  }
}

export default ActiveCategoryBtns;

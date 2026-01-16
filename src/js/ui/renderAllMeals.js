import FetchAllMeals from "../api/fetchAllMeals.js";
import SpinnerLoader from "./loader.js";

class RenderAllMeals {
  async renderAllMealsFunction(meals) {
    const loader = new SpinnerLoader();
    loader.show();
    if (!meals) {
      meals = await FetchAllMeals.fetchAllMealsFunction();
    }
    const container = document.getElementById("recipes-grid");
    const recipesCount = document.getElementById("recipes-count");
    if (!meals || meals.length === 0) {
      recipesCount.innerHTML = "Showing 0 recipes";
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
          </div>
          <p class="text-gray-500 text-lg">No recipes found</p>
          <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
        </div>
      `;
      loader.hide();
      return;
    }
    recipesCount.innerHTML = `Showing ${meals.length} recipes`;
    container.innerHTML = meals
      .map((meal) => {
        return `
            <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="${meal.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                   <i class="fas fa-tag mr-1 text-emerald-600"></i> ${meal.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    <i class="fas fa-globe mr-1 text-blue-600"></i> ${meal.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meal.instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>
            `;
      })
      .join("");

    loader.hide();
  }
}

export default RenderAllMeals;

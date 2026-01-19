import FoodLogUI from "./foodLogUI.js";
import LogMealModal from "./logMealModal.js";
import NutritionUI from "./nutritionUI.js";

class FetchMealDetailsUI {
  async fetchMealDetailsUIFunction(meal) {
    const header = document.getElementById("header");
    const search = document.getElementById("search-filters-section");
    const categories = document.getElementById("meal-categories-section");
    const allMeals = document.getElementById("all-recipes-section");
    // Meal Details
    const mealDetails = document.getElementById("meal-details");
    const backBtn = document.getElementById("back-to-meals-btn");
    const logMealBtn = document.getElementById("log-meal-btn");

    // ================= Header =================
    header.querySelector("h1").textContent = "Meal recipes";
    header.querySelector("p").textContent =
      "View full recipe information and nutrition facts";
    //   Hide other sections
    search.classList.add("hidden");
    categories.classList.add("hidden");
    allMeals.classList.add("hidden");
    mealDetails.classList.remove("hidden");

    // ================= Hero =================
    document.getElementById("meal-image").src = meal.thumbnail;
    document.getElementById("meal-image").alt = meal.name;
    document.getElementById("meal-title").textContent = meal.name;

    // Hero servings and calories
    const heroServings = document.getElementById("hero-servings");
    if (heroServings) {
      heroServings.textContent = "4 servings";
    }
    // ================= Badges =================
    const badgesContainer = mealDetails.querySelector(
      ".absolute.bottom-0 .flex"
    );

    badgesContainer.innerHTML = `
      <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
        ${meal.category}
      </span>
      <span class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
        ${meal.area}
      </span>
      ${
        meal.tags
          ? meal.tags
              .map(
                (tag) => `
              <span class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full">
                ${tag}
              </span>
            `
              )
              .join("")
          : ""
      }
    `;

    // ================= Ingredients =================
    const ingredientsContainer = document.querySelector(
      "#ingredients-container .grid"
    );

    // Update ingredients count
    const ingredientsCount = mealDetails.querySelector(
      "#ingredients-container h2 span"
    );
    if (ingredientsCount) {
      ingredientsCount.textContent = `${meal.ingredients.length} items`;
    }

    ingredientsContainer.innerHTML = "";

    meal.ingredients.forEach((item) => {
      ingredientsContainer.innerHTML += `
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
          <input
            type="checkbox"
            class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
          />
          <span class="text-gray-700">
            <span class="font-medium text-gray-900">${item.measure}</span>
            ${item.ingredient}
          </span>
        </div>
      `;
    });

    // ================= Instructions =================
    const instructionsContainer = document.querySelector(
      "#instructions-container .space-y-4"
    );
    instructionsContainer.innerHTML = "";

    meal.instructions.forEach((step, index) => {
      instructionsContainer.innerHTML += `
        <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
          <div
            class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
          >
            ${index + 1}
          </div>
          <p class="text-gray-700 leading-relaxed pt-2">
            ${step}
          </p>
        </div>
      `;
    });

    // ================= Video =================
    if (meal.youtube) {
      const iframe = document.querySelector("iframe");
      if (!iframe) return;

      iframe.src = meal.youtube.replace("watch?v=", "embed/");
    }

    // ================= Nutrition =================
    const nutritionUI = new NutritionUI();
    const nutrition = await nutritionUI.fetchNutrition(meal);
    // ================= Modal =================

    const logMealModal = new LogMealModal();

    logMealBtn.addEventListener("click", () => {
      logMealModal.show(meal, nutrition);
    });

    // Back Button
    backBtn.addEventListener("click", backToMeals);
    function backToMeals() {
      header.querySelector("h1").textContent = "Meals & Recipes";
      header.querySelector("p").textContent =
        "Discover delicious and nutritious recipes tailored for you";
      search.classList.remove("hidden");
      categories.classList.remove("hidden");
      allMeals.classList.remove("hidden");
      mealDetails.classList.add("hidden");
    }
  }
}

export default FetchMealDetailsUI;

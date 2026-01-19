import FetchNutrition from "../api/fetchNutrition.js";

class NutritionUI {
  constructor() {
    this.heroCalories = document.getElementById("hero-calories");
    this.nutritionContainer = document.getElementById(
      "nutrition-facts-container"
    );
    this.logMealBtn = document.getElementById("log-meal-btn");
  }

  async fetchNutrition(meal) {
    if (!this.heroCalories || !this.nutritionContainer) return;

    this.heroCalories.innerHTML = `
      <span class="inline-flex items-center gap-2">
        <svg class="animate-spin h-4 w-4 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Calculating...
      </span>
    `;

    this.nutritionContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center py-12">
        <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <i class="fas fa-calculator text-2xl text-emerald-600"></i>
        </div>
        <p class="text-lg font-semibold text-gray-900 mb-2">Calculating Nutrition</p>
        <p class="text-sm text-gray-500 mb-4">Analyzing ingredients...</p>
        <div class="flex gap-1">
          <div class="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
      </div>
    `;

    this.logMealBtn.classList.remove("hover:bg-blue-700", "cursor-pointer");
    this.logMealBtn.classList.add(
      "bg-gray-300",
      "hover:bg-gray-300",
      "text-gray-500",
      "cursor-not-allowed",
      "transition-all"
    );
    this.logMealBtn.setAttribute("disabled", true);

    this.logMealBtn.innerHTML = `
        <i class="fa fa-spinner fa-spin"></i>
        <span>Calculating...</span>                  
    `;

    const nutrition = await FetchNutrition.getNutrition(meal);

    if (!nutrition) {
      this.heroCalories.textContent = "N/A";
      this.nutritionContainer.innerHTML = `<p class="text-gray-500">Nutrition data not available</p>`;
      return;
    }

    this.renderNutrition(nutrition, meal);

    return nutrition;
  }

  renderNutrition(nutrition) {
    if (
      !nutrition ||
      !nutrition.breakdown.perServing ||
      !nutrition.breakdown.totals
    ) {
      this.heroCalories.textContent = "N/A";
      this.nutritionContainer.innerHTML = `<p class="text-gray-500">Nutrition data not available</p>`;
      return;
    }
    const breakdown = nutrition.breakdown;
    const perServing = breakdown.perServing || {};
    const totals = breakdown.totals || {};
    const servings = breakdown.servings || 1;

    const calories = perServing.calories || 0;
    const totalCalories = totals.calories || 0;
    const protein = perServing.protein || 0;
    const carbs = perServing.carbs || 0;
    const fat = perServing.fat || 0;
    const fiber = perServing.fiber || 0;
    const sugar = perServing.sugar || 0;
    const saturatedFat = perServing.saturatedFat || 0;
    const cholesterol = perServing.cholesterol || 0;
    const sodium = perServing.sodium || 0;

    // progress bars
    const maxProtein = 50;
    const maxCarbs = 300;
    const maxFat = 70;
    const maxFiber = 25;
    const maxSugar = 50;
    const maxSaturatedFat = 20;

    // Calculate percentages
    const proteinPercent = Math.min((protein / maxProtein) * 100, 100);
    const carbsPercent = Math.min((carbs / maxCarbs) * 100, 100);
    const fatPercent = Math.min((fat / maxFat) * 100, 100);
    const fiberPercent = Math.min((fiber / maxFiber) * 100, 100);
    const sugarPercent = Math.min((sugar / maxSugar) * 100, 100);
    const saturatedFatPercent = Math.min(
      (saturatedFat / maxSaturatedFat) * 100,
      100
    );

    this.logMealBtn.classList.add("hover:bg-blue-700", "cursor-pointer");
    this.logMealBtn.classList.remove(
      "bg-gray-300",
      "hover:bg-gray-300",
      "text-gray-500",
      "cursor-not-allowed",
      "transition-all"
    );
    this.logMealBtn.removeAttribute("disabled");
    this.logMealBtn.innerHTML = `
        <i class="fa-solid fa-clipboard-list"></i>
        <span>Log This Meal</span>
    `;

    this.heroCalories.textContent = `${calories} cal / serving`;

    this.nutritionContainer.innerHTML = `
      <p class="text-sm text-gray-500 mb-4">Per serving (${servings} servings)</p>
      
      <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
        <p class="text-sm text-gray-600">Calories per serving</p>
        <p class="text-4xl font-bold text-emerald-600">${calories}</p>
        <p class="text-xs text-gray-500 mt-1">Total: ${totalCalories} cal</p>
      </div>
      
      <div class="space-y-4">
        <!-- Protein -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span class="text-gray-700">Protein</span>
          </div>
          <span class="font-bold text-gray-900">${protein}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-emerald-500 h-2 rounded-full" style="width: ${proteinPercent}%"></div>
        </div>
        
        <!-- Carbs -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <span class="text-gray-700">Carbs</span>
          </div>
          <span class="font-bold text-gray-900">${carbs}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full" style="width: ${carbsPercent}%"></div>
        </div>
        
        <!-- Fat -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-purple-500"></div>
            <span class="text-gray-700">Fat</span>
          </div>
          <span class="font-bold text-gray-900">${fat}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-purple-500 h-2 rounded-full" style="width: ${fatPercent}%"></div>
        </div>
        
        <!-- Fiber -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-orange-500"></div>
            <span class="text-gray-700">Fiber</span>
          </div>
          <span class="font-bold text-gray-900">${fiber}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-orange-500 h-2 rounded-full" style="width: ${fiberPercent}%"></div>
        </div>
        
        <!-- Sugar -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-pink-500"></div>
            <span class="text-gray-700">Sugar</span>
          </div>
          <span class="font-bold text-gray-900">${sugar}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-pink-500 h-2 rounded-full" style="width: ${sugarPercent}%"></div>
        </div>
        
        <!-- Saturated Fat -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-red-500"></div>
            <span class="text-gray-700">Saturated Fat</span>
          </div>
          <span class="font-bold text-gray-900">${saturatedFat}g</span>
        </div>
        <div class="w-full bg-gray-100 rounded-full h-2">
          <div class="bg-red-500 h-2 rounded-full" style="width: ${saturatedFatPercent}%"></div>
        </div>
      </div> 
      <div class="mt-6 pt-6 border-t border-gray-100">
        <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Cholesterol</span>
            <span class="font-medium">${cholesterol}mg</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Sodium</span>
            <span class="font-medium">${sodium}mg</span>
          </div>
        </div>
      </div>
    `;
  }
}

export default NutritionUI;

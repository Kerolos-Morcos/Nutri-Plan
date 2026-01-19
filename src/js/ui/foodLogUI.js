class FoodLogUI {
  constructor() {
    this.currentDate = document.getElementById("foodlog-date");
    this.currentDateNow();
    this.storage =
      JSON.parse(localStorage.getItem("nutriplan_daily_log")) || {};
    this.targets = {
      calories: 2000,
      protein: 50,
      carbs: 250,
      fat: 65,
    };
    this.todaySection = document.getElementById("foodlog-today-section");
    this.weeklySection = document.getElementById("weekly-chart");
    this.todayNutrition();
    this.weeklyOverview();

    window.foodLogUIInstance = this;

    window.addEventListener("mealLogged", () => {
      this.todayNutrition();
      this.weeklyOverview();
    });
  }
  //   Display Current Date
  currentDateNow() {
    const date = new Date();
    const options = { weekday: "long", day: "numeric", month: "short" };
    this.currentDate.textContent = date.toLocaleDateString("en-US", options);
  }

  //   Calculate Progress (Progress Bar)
  calculateProgress(current, target) {
    if (!current || !target) return 0;
    const percent = (current / target) * 100;
    return Math.min(percent, 100);
  }

  //   Today's Nutrition Summary - Get From LocalStorage
  todayNutrition() {
    this.storage =
      JSON.parse(localStorage.getItem("nutriplan_daily_log")) || {};
    const today = new Date().toISOString().split("T")[0];
    const todayData = this.storage[today] || {
      meals: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
    };
    const caloriesProgress = this.calculateProgress(
      todayData.totalCalories,
      this.targets.calories
    );
    const proteinProgress = this.calculateProgress(
      todayData.totalProtein,
      this.targets.protein
    );
    const carbsProgress = this.calculateProgress(
      todayData.totalCarbs,
      this.targets.carbs
    );
    const fatProgress = this.calculateProgress(
      todayData.totalFat,
      this.targets.fat
    );

    this.todaySection.innerHTML = `
      <h3 class="text-lg font-bold text-gray-900 mb-4">
              <i class="fa-solid fa-fire text-orange-500 mr-2"></i>
              Today's Nutrition
            </h3>

            <!-- Progress Bars -->
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
              <!-- Calories Progress -->
              <div class="bg-emerald-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">
                    Calories
                  </span>
                  <span class="text-sm text-gray-500">${
                    this.storage[today]?.totalCalories ?? 0
                  } / 2000 kcal</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="${
                      this.storage[today]?.totalCalories >= 2000
                        ? "bg-red-500"
                        : "bg-emerald-500"
                    } h-2.5 rounded-full"
                    style="width: ${caloriesProgress}%"
                  ></div>
                </div>
              </div>
              <!-- Protein Progress -->
              <div class="bg-blue-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">
                    Protein
                  </span>
                  <span class="text-sm text-gray-500">${
                    this.storage[today]?.totalProtein ?? 0
                  } / 50 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="${
                      this.storage[today]?.totalProtein >= 50
                        ? "bg-red-500"
                        : "bg-blue-500"
                    } h-2.5 rounded-full"
                    style="width: ${proteinProgress}%"
                  ></div>
                </div>
              </div>
              <!-- Carbs Progress -->
              <div class="bg-amber-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Carbs</span>
                  <span class="text-sm text-gray-500">${
                    this.storage[today]?.totalCarbs ?? 0
                  } / 250 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="${
                      this.storage[today]?.totalCarbs >= 250
                        ? "bg-red-500"
                        : "bg-amber-500"
                    } h-2.5 rounded-full"
                    style="width: ${carbsProgress}%"
                  ></div>
                </div>
              </div>
              <!-- Fat Progress -->
              <div class="bg-purple-50 rounded-xl p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Fat</span>
                  <span class="text-sm text-gray-500">${
                    this.storage[today]?.totalFat ?? 0
                  } / 65 g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    class="${
                      this.storage[today]?.totalFat >= 65
                        ? "bg-red-500"
                        : "bg-purple-500"
                    } h-2.5 rounded-full"
                    style="width: ${fatProgress}%"
                  ></div>
                </div>
              </div>
            </div>
            <!-- Logged Items -->
            <div class="border-t border-gray-200 pt-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-semibold text-gray-700">
                  Logged Items (${this.storage[today]?.meals.length ?? 0})
                </h4>
                ${
                  this.storage[today]?.meals.length > 0
                    ? `<button
                      id="clearAllBtn"
                      class="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      <i class="fa-solid fa-trash mr-1"></i>
                      Clear All
                    </button>`
                    : ``
                }
                
              </div>
              <div class="space-y-3 max-h-96 overflow-y-auto">
                ${
                  (this.storage[today]?.meals?.length || 0) > 0
                    ? this.storage[today]?.meals
                        .map((meal, index) => {
                          const time = new Date(
                            meal.loggedAt.includes("T") ? meal.loggedAt : ""
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          });
                          return `
                    <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all">
                        <div class="flex items-center gap-4">
                            <img src=${meal.thumbnail} alt="${meal.name}" class="w-14 h-14 rounded-xl object-cover">
                            <div>
                                <p class="font-semibold text-gray-900">${meal.name}</p>
                                <p class="text-sm text-gray-500">
                                    ${meal.servings} serving
                                    <span class="mx-1">•</span>
                                    <span class="text-emerald-600">Recipe</span>
                                </p>
                                <p class="text-xs text-gray-400 mt-1">${time}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="text-right">
                                <p class="text-lg font-bold text-emerald-600">${meal.nutrition.calories}</p>
                                <p class="text-xs text-gray-500">kcal</p>
                            </div>
                            <div class="hidden md:flex gap-2 text-xs text-gray-500">
                                <span class="px-2 py-1 bg-blue-50 rounded">${meal.nutrition.protein}g P</span>
                                <span class="px-2 py-1 bg-amber-50 rounded">${meal.nutrition.carbs}g C</span>
                                <span class="px-2 py-1 bg-purple-50 rounded">${meal.nutrition.fat}g F</span>
                            </div>
                            <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-index="${index}">
                                <i class="fa fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
              `;
                        })
                        .join("")
                    : ` <div id="logged-items-list" class="space-y-2">
                <!-- Empty State -->
                <div class="text-center py-8 text-gray-500">
                  <i
                    class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
                  ></i>
                  <p class="font-medium">No meals logged today</p>
                  <p class="text-sm">
                    Add meals from the Meals page or scan products
                  </p>
                </div>
              </div>`
                } 
             
            </div>
    `;
    this.clearAllBtn = document.getElementById("clearAllBtn");
    this.clearAllItems(today);
    this.attachmentRemoveListener(today);
  }

  clearAllItems(today) {
    this.clearAllBtn?.addEventListener("click", () => {
      Swal.fire({
        title: "Clear Today's Log?",
        text: "This will remove all logged food items for today.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6B7280",
        confirmButtonText: "Yes, clear it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const data =
            JSON.parse(localStorage.getItem("nutriplan_daily_log")) || {};
          delete data[today];
          localStorage.setItem("nutriplan_daily_log", JSON.stringify(data));
          this.storage = data;
          this.todayNutrition();
        }
      });
    });
  }

  attachmentRemoveListener(today) {
    const removeButtons = document.querySelectorAll(".remove-foodlog-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const index = Number(button.dataset.index);
        const data =
          JSON.parse(localStorage.getItem("nutriplan_daily_log")) || {};

        const meal = data[today].meals[index];

        data[today].totalCalories -= meal.nutrition.calories;
        data[today].totalProtein -= meal.nutrition.protein;
        data[today].totalCarbs -= meal.nutrition.carbs;
        data[today].totalFat -= meal.nutrition.fat;

        data[today].meals.splice(index, 1);

        localStorage.setItem("nutriplan_daily_log", JSON.stringify(data));

        this.todayNutrition();

        Swal.fire({
          icon: "success",
          title: "Meal Removed",
          text: `${meal.name} has been removed`,
          timer: 1500,
          showConfirmButton: false,
        });
      });
    });
  }

  //   Weekly Overview
  weeklyOverview() {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateKey = date.toISOString().split("T")[0];
      const data = this.storage[dateKey] || { totalCalories: 0 };
      weekData.push({
        day: daysOfWeek[date.getDay()],
        date: date.getDate(),
        calories: data.totalCalories ?? 0,
        isToday: dateKey === today.toISOString().split("T")[0],
      });
    }
    this.weeklySection.innerHTML = weekData
      .map(
        (d) => `
      <div class="text-center ${d.isToday ? "bg-indigo-100 rounded-xl" : ""}">
        <p class="text-xs text-gray-500 mb-1">${d.day}</p>
        <p class="text-sm font-medium text-gray-900">${d.date}</p>
        <div class="mt-2 text-gray-300">
          <p class="text-lg font-bold">${d.calories}</p>
          <p class="text-xs">kcal</p>
        </div>
      </div>
    `
      )
      .join("");
  }
}

export default FoodLogUI;

class LogMealModal {
  constructor() {
    this.modal = document.getElementById("log-meal-modal");
    this.cancelBtn = document.getElementById("cancel-log-meal");

    this.image = this.modal.querySelector("img");
    this.title = this.modal.querySelector("h3");
    this.subtitle = this.modal.querySelector("p");

    this.calories = document.getElementById("modal-calories");
    this.protein = document.getElementById("modal-protein");
    this.carbs = document.getElementById("modal-carbs");
    this.fat = document.getElementById("modal-fat");
    this.increase = document.getElementById("increase-servings");
    this.decrease = document.getElementById("decrease-servings");
    this.inputValue = document.getElementById("meal-servings");
    this.valueNumber = Number(this.inputValue.value);
    this.cancelBtn.addEventListener("click", () => this.hide());
    this.logBtn = document.getElementById("confirm-log-meal");
    this.logButtonListener = () => {
      this.logMeal();
    };
    this.logBtn.addEventListener("click", this.logButtonListener);
    this.increase.addEventListener("click", () => this.increment());
    this.decrease.addEventListener("click", () => this.decrement());
    this.inputValue.addEventListener("change", () => this.handleInputChange());
    this.inputValue.addEventListener("input", () => this.handleInputChange());
  }

  resetModal() {
    this.inputValue.value = 1;
    this.valueNumber = this.inputValue.value;

    this.image.src = "";
    this.title.textContent = "";
    this.subtitle.textContent = "";
    this.calories.textContent = "0";
    this.protein.textContent = "0g";
    this.carbs.textContent = "0g";
    this.fat.textContent = "0g";

    this.meal = null;
    this.nutrition = null;
  }

  show(meal, nutrition) {
    this.resetModal();
    this.meal = meal;
    this.nutrition = nutrition;

    this.inputValue.value = 1;

    this.image.src = meal.thumbnail;
    this.subtitle.textContent = meal.name;
    this.calories.textContent = nutrition.breakdown.perServing.calories ?? 0;
    this.protein.textContent = `${
      nutrition.breakdown.perServing.protein ?? 0
    }g`;
    this.carbs.textContent = `${nutrition.breakdown.perServing.carbs ?? 0}g`;
    this.fat.textContent = `${nutrition.breakdown.perServing.fat ?? 0}g`;

    this.modal.classList.remove("hidden");
  }

  hide() {
    this.modal.classList.add("hidden");
    this.inputValue.value = 1;
    this.logBtn.removeEventListener("click", this.logButtonListener);
  }

  //   Inc & Dec
  increment() {
    this.valueNumber = Math.min(this.valueNumber + 0.5, 10);
    this.inputValue.value = this.valueNumber.toFixed(1);
  }

  decrement() {
    this.valueNumber = Math.max(this.valueNumber - 0.5, 0.5);
    this.inputValue.value = this.valueNumber.toFixed(1);
  }

  // For Manual Input User
  handleInputChange() {
    let val = parseFloat(this.inputValue.value);
    if (isNaN(val) || val < 0.5) val = 0.5;
    if (val > 10) val = 10;
    this.valueNumber = val;
    this.inputValue.value = this.valueNumber.toFixed(1);
  }

  // Log Meal Button to LocalStorage
  logMeal() {
    const servings = Number(this.inputValue.value);
    const per = this.nutrition.breakdown.perServing;
    const today = new Date().toISOString().split("T")[0];

    const calories = per.calories * servings;
    const protein = per.protein * servings;
    const carbs = per.carbs * servings;
    const fat = per.fat * servings;

    const storage =
      JSON.parse(localStorage.getItem("nutriplan_daily_log")) || {};

    if (!storage[today]) {
      storage[today] = {
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        meals: [],
      };
    }

    const meals = storage[today].meals;

    const existingMeal = meals.find((m) => m.mealId.includes(this.meal.id));
    if (existingMeal) {
      existingMeal.servings += servings;
      existingMeal.nutrition.calories += calories;
      existingMeal.nutrition.protein += protein;
      existingMeal.nutrition.carbs += carbs;
      existingMeal.nutrition.fat += fat;
      existingMeal.loggedAt = new Date().toISOString();
    } else {
      meals.push({
        type: "meal",
        mealId: this.meal.id,
        name: this.meal.name,
        thumbnail: this.meal.thumbnail,
        servings,
        nutrition: {
          calories,
          protein,
          carbs,
          fat,
        },
        loggedAt: new Date().toISOString(),
      });
    }

    storage[today].totalCalories += calories;
    storage[today].totalProtein += protein;
    storage[today].totalCarbs += carbs;
    storage[today].totalFat += fat;

    localStorage.setItem("nutriplan_daily_log", JSON.stringify(storage));

    if (window.foodLogUIInstance) {
      window.foodLogUIInstance.todayNutrition();
    }

    window.dispatchEvent(
      new CustomEvent("mealLogged", {
        detail: {
          meal: this.meal,
          date: today,
        },
      })
    );

    Swal.fire({
      icon: "success",
      title: "Meal Logged!",
      html: `
    <p style="margin-bottom: 8px;">
      <strong>${this.meal.name}</strong>
      (${servings} servings)
      has been added to your daily log
    </p>
    <p style="color: #16a34a; font-size: 18px; font-weight: bold;">
      +${Math.round(calories)} calories
    </p>
  `,
      confirmButtonText: "Ok",
      confirmButtonColor: "#16a34a",
    });

    this.hide();
  }
}

export default LogMealModal;

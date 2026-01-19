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
    this.logBtn.addEventListener("click", () => this.logMeal());

    this.increment();
    this.decrement();
  }

  show(meal, nutrition) {
    console.log("Nutri Data", nutrition);
    this.meal = meal;
    this.nutrition = nutrition;
    // fill data
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
  }

  // Increment Plus Button
  increment() {
    this.increase.addEventListener("click", () => {
      this.valueNumber += 0.5;
      this.inputValue.value = this.valueNumber;
      if (this.valueNumber > 10) {
        this.valueNumber = 10;
        this.inputValue.value = this.valueNumber;
      }
    });
  }

  //   Decrement Minus Button
  decrement() {
    this.decrease.addEventListener("click", () => {
      this.valueNumber = this.valueNumber - 0.5;
      this.inputValue.value = this.valueNumber;
      if (this.valueNumber < 0.5) {
        this.valueNumber = 0.5;
        this.inputValue.value = this.valueNumber;
      }
    });
  }

  //   Log Meal Button to LocalStorage
  logMeal() {
    const servings = Number(this.inputValue.value);
    const per = this.nutrition.breakdown.perServing;
    const calories = per.calories * servings;
    const protein = per.protein * servings;
    const carbs = per.carbs * servings;
    const fat = per.fat * servings;
    const today = new Date().toISOString().split("T")[0];
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
    storage[today].meals.push({
      type: "meal",
      mealId: this.meal.id,
      name: this.meal.name,
      category: this.meal.category,
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

    storage[today].totalCalories += calories;
    storage[today].totalProtein += protein;
    storage[today].totalCarbs += carbs;
    storage[today].totalFat += fat;

    localStorage.setItem("nutriplan_daily_log", JSON.stringify(storage));

    // Success Message
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
      confirm: true,
      confirmButtonText: "Ok",
      confirmButtonColor: "#16a34a",
    });

    this.hide();
  }
}

export default LogMealModal;

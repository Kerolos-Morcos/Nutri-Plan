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

    this.cancelBtn.addEventListener("click", () => this.hide());
  }

  show(meal, nutrition) {
    console.log("Nutri Data", nutrition);
    // fill data
    this.image.src = meal.thumbnail;
    this.subtitle.textContent = meal.name;

    this.calories.textContent = nutrition.breakdown.perServing.calories ?? 0;
    this.protein.textContent = `${nutrition.breakdown.perServing.protein ?? 0}g`;
    this.carbs.textContent = `${nutrition.breakdown.perServing.carbs ?? 0}g`;
    this.fat.textContent = `${nutrition.breakdown.perServing.fat ?? 0}g`;

    this.modal.classList.remove("hidden");
  }

  hide() {
    this.modal.classList.add("hidden");
  }
}

export default LogMealModal;

import GetProductByBarcode from "../api/fetchProductByBarcode.js";

class ProductModal {
  constructor() {
    this.modal = document.getElementById("productScanner-modal");
    this.currentProduct = null;

    this.image = document.getElementById("productScanner-modal-product-image");
    this.name = document.getElementById("productScanner-modal-product-name");
    this.brand = document.getElementById("productScanner-modal-product-brand");
    this.quantity = document.getElementById(
      "productScanner-modal-product-quantity"
    );

    this.nutriScore = document.getElementById(
      "productScanner-modal-nutriscore"
    );
    this.novaScore = document.getElementById("productScanner-modal-nova");

    this.calories = document.getElementById("productScanner-modal-calories");

    this.protein = document.getElementById("productScanner-modal-protein");
    this.carbs = document.getElementById("productScanner-modal-carbs");
    this.fat = document.getElementById("productScanner-modal-fat");
    this.sugar = document.getElementById("productScanner-modal-sugar");

    this.proteinBar = document.getElementById(
      "productScanner-modal-protein-bar"
    );
    this.carbsBar = document.getElementById("productScanner-modal-carbs-bar");
    this.fatBar = document.getElementById("productScanner-modal-fat-bar");
    this.sugarBar = document.getElementById("productScanner-modal-sugar-bar");

    this.saturatedFat = document.getElementById(
      "productScanner-modal-saturated-fat"
    );
    this.fiber = document.getElementById("productScanner-modal-fiber");
    this.salt = document.getElementById("productScanner-modal-salt");

    this.ingredientsContainer = document.getElementById(
      "productScanner-modal-ingredients-container"
    );
    this.ingredients = document.getElementById(
      "productScanner-modal-ingredients"
    );

    this.allergensContainer = document.getElementById(
      "productScanner-modal-allergens-container"
    );
    this.allergens = document.getElementById("productScanner-modal-allergens");

    this.closeBtns = [
      document.getElementById("productScanner-modal-close-btn"),
      document.getElementById("productScanner-modal-close-btn-bottom"),
    ];

    this.logProductBtn = document.getElementById(
      "productScanner-modal-add-to-log"
    );
    if (this.logProductBtn) {
      this.logProductBtn.addEventListener("click", () => {
        this.addProductToLog(1);
        this.close();
      });
    }

    this.closeModalBtn();
  }

  closeModalBtn() {
    this.closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.close());
    });
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }

  async open(barcode) {
    const product = await GetProductByBarcode.fetchProductByBarcode(barcode);
    if (!product) return;

    this.currentProduct = product;
    this.fillData(product);
    this.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  fillData(product) {
    const nutrients = product.nutrients || {};

    this.image.src =
      product.image || "https://via.placeholder.com/250?text=No+Image";
    this.name.textContent = product.name || "Unknown Product";
    this.brand.textContent = product.brand || "Unknown Brand";
    this.quantity.textContent = product.quantity || "100g";

    this.nutriScore.innerHTML = product.nutritionGrade
      ? `<span class="font-bold">Nutri-Score: ${product.nutritionGrade}</span>`
      : "";

    this.novaScore.innerHTML =
      product.novaGroup != null
        ? `<span class="font-bold">NOVA: ${product.novaGroup}</span>`
        : "";

    this.calories.textContent = Math.round(nutrients.calories ?? 0);

    const protein = nutrients.protein ?? 0;
    const carbs = nutrients.carbs ?? 0;
    const fat = nutrients.fat ?? 0;
    const sugar = nutrients.sugar ?? 0;

    this.protein.textContent = `${protein}g`;
    this.carbs.textContent = `${carbs}g`;
    this.fat.textContent = `${fat}g`;
    this.sugar.textContent = `${sugar}g`;

    this.proteinBar.style.width = `${Math.min((protein / 50) * 100, 100)}%`;
    this.carbsBar.style.width = `${Math.min((carbs / 100) * 100, 100)}%`;
    this.fatBar.style.width = `${Math.min((fat / 65) * 100, 100)}%`;
    this.sugarBar.style.width = `${Math.min((sugar / 50) * 100, 100)}%`;

    this.saturatedFat.textContent = `${nutrients.saturatedFat ?? 0}g`;
    this.fiber.textContent = `${nutrients.fiber ?? 0}g`;
    this.salt.textContent = `${nutrients.salt ?? 0}g`;

    if (product.ingredients) {
      this.ingredients.textContent = product.ingredients;
      this.ingredientsContainer.classList.remove("hidden");
    } else {
      this.ingredientsContainer.classList.add("hidden");
    }

    if (product.allergens && product.allergens.length > 0) {
      this.allergens.textContent = product.allergens.join(", ");
      this.allergensContainer.classList.remove("hidden");
    } else {
      this.allergensContainer.classList.add("hidden");
    }
  }

  close() {
    this.modal.classList.add("hidden");
    document.body.style.overflow = "";
    this.currentProduct = null;
  }

  //   local
  async addProductToLog(servings = 1) {
    if (!this.currentProduct || !this.currentProduct.nutrients) return;
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

    const nutrients = this.currentProduct.nutrients || {};
    const calories = (nutrients.calories || 0) * servings;
    const protein = (nutrients.protein || 0) * servings;
    const carbs = (nutrients.carbs || 0) * servings;
    const fat = (nutrients.fat || 0) * servings;

    const meals = storage[today].meals;
    const existingMeal = meals.find((m) => m.mealId === this.currentProduct.id);

    if (existingMeal) {
      existingMeal.servings += servings;
      existingMeal.nutrition.calories += calories;
      existingMeal.nutrition.protein += protein;
      existingMeal.nutrition.carbs += carbs;
      existingMeal.nutrition.fat += fat;
      existingMeal.loggedAt = new Date().toISOString();
    } else {
      meals.push({
        type: "product",
        mealId: this.currentProduct.id,
        name: this.currentProduct.name,
        thumbnail: this.currentProduct.image,
        servings,
        nutrition: {
          calories,
          protein,
          carbs,
          fat,
        },
        loggedAt: new Date().toISOString(),
        source: "scanner",
      });
    }

    storage[today].totalCalories += calories;
    storage[today].totalProtein += protein;
    storage[today].totalCarbs += carbs;
    storage[today].totalFat += fat;

    localStorage.setItem("nutriplan_daily_log", JSON.stringify(storage));

    window.dispatchEvent(new CustomEvent("mealLogged"));

    Swal.fire({
      icon: "success",
      title: "Product Logged!",
      html: `
      <p style="margin-bottom: 8px;">
        <strong>${this.currentProduct.name}</strong>
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
  }
}

export default ProductModal;

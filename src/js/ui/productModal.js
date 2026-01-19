import GetProductByBarcode from "../api/fetchProductByBarcode.js";

class ProductModal {
  constructor() {
    this.modal = document.getElementById("product-modal");
    this.currentProduct = null;

    this.image = document.getElementById("modal-product-image");
    this.name = document.getElementById("modal-product-name");
    this.brand = document.getElementById("modal-product-brand");
    this.quantity = document.getElementById("modal-product-quantity");

    this.nutriScore = document.getElementById("modal-nutriscore");
    this.novaScore = document.getElementById("modal-nova");

    this.calories = document.getElementById("modal-calories");

    this.protein = document.getElementById("modal-protein");
    this.carbs = document.getElementById("modal-carbs");
    this.fat = document.getElementById("modal-fat");
    this.sugar = document.getElementById("modal-sugar");

    this.proteinBar = document.getElementById("modal-protein-bar");
    this.carbsBar = document.getElementById("modal-carbs-bar");
    this.fatBar = document.getElementById("modal-fat-bar");
    this.sugarBar = document.getElementById("modal-sugar-bar");

    this.saturatedFat = document.getElementById("modal-saturated-fat");
    this.fiber = document.getElementById("modal-fiber");
    this.salt = document.getElementById("modal-salt");

    this.ingredientsContainer = document.getElementById(
      "modal-ingredients-container"
    );
    this.ingredients = document.getElementById("modal-ingredients");

    this.allergensContainer = document.getElementById(
      "modal-allergens-container"
    );
    this.allergens = document.getElementById("modal-allergens");

    this.closeBtns = [
      document.getElementById("modal-close-btn"),
      document.getElementById("modal-close-btn-bottom"),
    ];

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

    this.proteinBar.style.width = `${(protein / 50) * 100}%`;
    this.carbsBar.style.width = `${(carbs / 100) * 100}%`;
    this.fatBar.style.width = `${(fat / 65) * 100}%`;
    this.sugarBar.style.width = `${(sugar / 50) * 100}%`;

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
}

export default ProductModal;

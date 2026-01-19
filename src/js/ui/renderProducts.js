import SpinnerLoader from "./loader.js";

class RenderProducts {
  constructor(loaderId = "products-loader") {
    this.container = document.getElementById("products-grid");
    this.countElement = document.getElementById("products-count");
    this.emptyContainer = document.getElementById("products-empty");
    this.loader = new SpinnerLoader(loaderId);
  }

  renderProductsFunction({
    products = [],
    pagination = null,
    category = null,
  }) {
    this.container.innerHTML = products
      .map((product) => this.createProductCard(product))
      .join("");
    this.container.style.display = "grid";
    if (pagination && pagination.total) {
      this.countElement.textContent = `Found ${pagination.total} product in ${category}`;
    } else {
      this.countElement.textContent = `Found ${products.length} products`;
    }
  }

  createProductCard(product) {
    const nutriScore = product.nutritionGrade || "N/A";
    const nova = product.novaGroup ?? "N/A";
    const image =
      product.image || "https://via.placeholder.com/250?text=No+Image";

    const kcal = product.nutrients?.calories ?? 0;
    const protein = product.nutrients?.protein ?? 0;
    const carbs = product.nutrients?.carbs ?? 0;
    const fat = product.nutrients?.fat ?? 0;
    const sugar = product.nutrients?.sugar ?? 0;
    const weight = product.quantity || "100g";

    return `
      <div 
        class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-barcode="${product.barcode}"
      >
        <div class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            src="${image}"
            alt="${product.name}"
            loading="lazy"
          />
          <div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
            Nutri-Score ${nutriScore}
          </div>
          <div
            class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            title="NOVA ${nova}"
          >
            ${nova}
          </div>
        </div>
        <div class="p-4">
          <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
            ${product.brand || "Unknown Brand"}
          </p>
          <h3 class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            ${product.name}
          </h3>
          <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
            <span>
              <i class="fa-solid fa-weight-scale mr-1"></i>
              ${weight}
            </span>
            <span>
              <i class="fa-solid fa-fire mr-1"></i>
              ${kcal} kcal / 100g
            </span>
          </div>
          <div class="grid grid-cols-4 gap-1 text-center">
            <div class="bg-emerald-50 rounded p-1.5">
              <p class="text-xs font-bold text-emerald-700">${protein}g</p>
              <p class="text-[10px] text-gray-500">Protein</p>
            </div>
            <div class="bg-blue-50 rounded p-1.5">
              <p class="text-xs font-bold text-blue-700">${carbs}g</p>
              <p class="text-[10px] text-gray-500">Carbs</p>
            </div>
            <div class="bg-purple-50 rounded p-1.5">
              <p class="text-xs font-bold text-purple-700">${fat}g</p>
              <p class="text-[10px] text-gray-500">Fat</p>
            </div>
            <div class="bg-orange-50 rounded p-1.5">
              <p class="text-xs font-bold text-orange-700">${sugar}g</p>
              <p class="text-[10px] text-gray-500">Sugar</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

export default RenderProducts;

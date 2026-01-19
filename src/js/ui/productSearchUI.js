import GetProductByBarcode from "../api/fetchProductByBarcode.js";
import SearchProducts from "../api/searchProducts.js";
import SpinnerLoader from "./loader.js";
import RenderProducts from "./renderProducts.js";

class ProductSearchUI {
  constructor() {
    this.searchBtn = document.getElementById("search-product-btn");
    this.searchInput = document.getElementById("product-search-input");
    this.barcodeBtn = document.getElementById("lookup-barcode-btn");
    this.barcodeInput = document.getElementById("barcode-input");
    this.loader = new SpinnerLoader();
    this.renderer = new RenderProducts();
  }

  searchInputListener() {
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.searchInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") this.handleSearch();
    });

    this.barcodeBtn.addEventListener("click", () => this.handleBarcodeSearch());
    this.barcodeInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") this.handleBarcodeSearch();
    });
  }

  async handleSearch() {
    const query = this.searchInput.value.trim();
    if (!query) return;

    this.renderer.container.style.display = "none";
    this.renderer.emptyContainer.style.display = "none";

    this.renderer.loader.show();

    const products = await SearchProducts.searchProductsByName(query);

    this.renderer.loader.hide();

    this.renderer.renderProductsFunction({ products });
  }

  async handleBarcodeSearch() {
    const barcode = this.barcodeInput.value.trim();
    if (!barcode) return;

    this.renderer.container.style.display = "none";
    this.renderer.emptyContainer.style.display = "none";
    this.renderer.loader.show();

    const product = await GetProductByBarcode.fetchProductByBarcode(barcode);

    this.renderer.loader.hide();

    if (product) {
      this.renderer.renderProductsFunction({ products: [product] });
    } else {
      this.renderer.renderProductsFunction({ products: [] });
    }
  }
}

export default ProductSearchUI;

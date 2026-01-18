class SearchProducts {
  static async searchProductsByName(query, page = 1, limit = 20) {
    if (!query) return [];

    try {
      const response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/search?q=${query}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("SearchProducts failed:", error);
      return [];
    }
  }
}

export default SearchProducts;

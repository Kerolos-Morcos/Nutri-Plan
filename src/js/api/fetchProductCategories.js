class GetProductCategories {
  static async fetchAllCategories() {
    try {
      const response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/categories`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("GetProductCategories failed:", error);
      return [];
    }
  }
}

export default GetProductCategories;

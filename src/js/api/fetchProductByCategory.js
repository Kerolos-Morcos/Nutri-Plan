class GetProductsByCategory {
  static async fetchProductsByCategory(category) {
    if (!category) {
      return [];
    }

    try {
      const response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/category/${category}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("GetProductsByCategory failed:", error);
      return data || [];
    }
  }
}

export default GetProductsByCategory;

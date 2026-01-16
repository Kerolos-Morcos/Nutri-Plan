class FetchMealCategories {
  static async fetchMealCategoriesFunction(retries = 2) {
    try {
      const response = await fetch(
        "https://nutriplan-api.vercel.app/api/meals/categories",
        { cache: "no-store" }
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      if (retries > 0) {
        return this.fetchMealCategoriesFunction(retries - 1);
      }
      console.error("FetchMealCategories failed:", err);
      return [];
    }
  }
}

export default FetchMealCategories;

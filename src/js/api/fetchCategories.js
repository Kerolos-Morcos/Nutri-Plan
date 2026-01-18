class FetchMealCategories {
  static async fetchMealCategoriesFunction() {
    try {
      const response = await fetch(
        "https://nutriplan-api.vercel.app/api/meals/categories"
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      console.error("FetchMealCategories failed:", err);
      return [];
    }
  }
}

export default FetchMealCategories;

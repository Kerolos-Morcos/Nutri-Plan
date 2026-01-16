class FetchAllMeals {
  static async fetchAllMealsFunction() {
    try {
      const response = await fetch(
        "https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25"
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      console.error("FetchAllMeals failed:", err);
      return [];
    }
  }
}

export default FetchAllMeals;

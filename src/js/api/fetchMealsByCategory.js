class FetchMealsByCategories {
  static async fetchMealsByCategoryFunction(category) {
    try {
      const response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/filter?category=${category}&page=1&limit=25`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      console.error(`Fetch failed for category: ${category}`, err);
      return [];
    }
  }
}

export default FetchMealsByCategories;

class SearchFeature {
  static async searchMeals(query, page = 1, limit = 25) {
    if (!query) return [];

    try {
      const response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/search?q=${query}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("SearchFeature failed:", error);
      return [];
    }
  }
}

export default SearchFeature;

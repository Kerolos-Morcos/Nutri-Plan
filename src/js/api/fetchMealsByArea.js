class FetchMealsByArea {
  static async fetchMealsByAreaFunction(area) {
    try {
      const url =
        area === "all"
          ? "https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25"
          : `https://nutriplan-api.vercel.app/api/meals/filter?area=${area}&page=1&limit=25`;

      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      console.error(`FetchMealsByArea failed for area: ${area}`, err);
      return [];
    }
  }
}

export default FetchMealsByArea;

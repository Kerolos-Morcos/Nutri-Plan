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

// <div
//   class="flex items-center justify-center py-12"
//   id="loading-spinner"
// >
//   <div
//     class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"
//   ></div>
// </div>

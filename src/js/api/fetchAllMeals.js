class FetchAllMeals {
 static async fetchAllMealsFunction() {
    const response = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25"
    );
    const data = await response.json();
    return data.results;
  }
}

export default FetchAllMeals;

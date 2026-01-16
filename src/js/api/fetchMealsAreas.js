class FetchMealsAreas {
  static async fetchMealsAreas() {
    const response = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/areas"
    );
    const data = await response.json();
    return data.results;
  }
}

export default FetchMealsAreas;

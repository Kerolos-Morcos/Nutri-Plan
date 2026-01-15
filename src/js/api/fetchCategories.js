class fetchMealCategories {
  static async getCategories() {
    const response = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/categories"
    );
    const data = await response.json();
    return data.results;
  }
}

export default fetchMealCategories;
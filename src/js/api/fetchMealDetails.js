class FetchMealDetails {
  static async getMealById(id) {
    try {
      const response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/${id}`
      );
      const data = await response.json();
      return data.result || null;
    } catch (error) {
      console.error("Error fetching meal details:", error);
      return null;
    }
  }
}

export default FetchMealDetails;

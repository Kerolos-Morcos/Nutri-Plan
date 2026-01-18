class FetchNutrition {
  static async getNutrition(meal) {
    const apiKey = "4ETE6d8KcWl85YbWqQVZrrCrN8cs2ZyisTb4zoAf";

    let ingredients = meal.ingredients;
    if (Array.isArray(meal.ingredients)) {
      ingredients = meal.ingredients
        .map((i) => {
          const name = (i.ingredient || "").toLowerCase().trim();
          const measure = (i.measure || "").toLowerCase().trim();
          if (!name) return null;
          return `${measure} ${name}`;
        })
        .filter(Boolean);
    }

    const requestBody = {
      recipeName: meal.recipeName || "Recipe",
      ingredients: ingredients,
    };

    try {
      console.log("Final Ingredients Array:", ingredients);
      const response = await fetch(
        "https://nutriplan-api.vercel.app/api/nutrition/analyze",
        {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Server Error (${response.status}):`, errorText);
        return null;
      }
      const data = await response.json();
      if (data.success && data.data) {
        return {
          totalCalories: data.data.totalCalories || 0,
          breakdown: data.data.breakdown || data.data,
          title: data.data.title || requestBody.recipeName,
        };
      } else {
        console.warn("API returned success:false", data);
        return null;
      }
    } catch (error) {
      console.error("Network or Parsing Error:", error);
      return null;
    }
  }
}

export default FetchNutrition;

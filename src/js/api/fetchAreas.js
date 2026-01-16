class FetchAreas {
  static async fetchAreasFunction(retries = 2) {
    try {
      const response = await fetch(
        "https://nutriplan-api.vercel.app/api/meals/areas",
        { cache: "no-store" }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      return data.results || [];
    } catch (err) {
      if (retries > 0) {
        return this.fetchAreasFunction(retries - 1);
      }

      console.error("FetchAreas failed:", err);
      return [];
    }
  }
}

export default FetchAreas;

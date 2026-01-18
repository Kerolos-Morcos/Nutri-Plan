class FetchAreas {
  static async fetchAreasFunction() {
    try {
      const response = await fetch(
        "https://nutriplan-api.vercel.app/api/meals/areas"
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.results || [];
    } catch (err) {
      console.error("FetchAreas failed:", err);
      return [];
    }
  }
}

export default FetchAreas;

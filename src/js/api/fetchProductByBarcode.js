class GetProductByBarcode {
  static async fetchProductByBarcode(barcode) {
    if (!barcode) return null;

    try {
      const response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.result || null;
    } catch (error) {
      console.error("GetProductByBarcode failed:", error);
      return null;
    }
  }
}

export default GetProductByBarcode;

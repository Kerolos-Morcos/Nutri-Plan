import FetchAreas from "../api/fetchAreas.js";
import ActiveAreaBtns from "./activeAreaBtns.js";

class RenderAreas {
  container = document.querySelector(
    "#search-filters-section .flex.items-center"
  );
  async renderAreasFunction() {
    const areas = await FetchAreas.fetchAreasFunction();

    let allMeals = `
      <button
        class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
        data-area="all"
      >
        All Recipes
      </button>
    `;

    allMeals += areas
      .slice(0, 10)
      .map(
        (area) => `
          <button
            class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            data-area="${area.name}"
          >
            ${area.name}
          </button>
        `
      )
      .join("");

    this.container.innerHTML = allMeals;
    ActiveAreaBtns.activeBtnsFunction();
  }
}

export default RenderAreas;

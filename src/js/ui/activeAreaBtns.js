import FetchMealsByArea from "../api/fetchMealsByArea.js";
import SpinnerLoader from "./loader.js";
import RenderAllMeals from "./renderAllMeals.js";
import RenderAreas from "./renderAreas.js";

class ActiveAreaBtns {
  static activeBtnsFunction() {
    const container = new RenderAreas().container;
    const buttons = container.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        buttons.forEach((b) => {
          b.classList.remove(
            "bg-emerald-600",
            "text-white",
            "hover:bg-emerald-700"
          );
          b.classList.add("bg-gray-100", "text-gray-700");
        });
        btn.classList.remove("bg-gray-100", "text-gray-700");
        btn.classList.add(
          "bg-emerald-600",
          "text-white",
          "hover:bg-emerald-700"
        );
        // Filter by area
        const area = btn.dataset.area;
        const mealsContainer = document.getElementById("recipes-grid");
        mealsContainer.innerHTML = "";
        const loader = new SpinnerLoader();
        loader.show();
        const meals = await FetchMealsByArea.fetchMealsByAreaFunction(area);
        await new RenderAllMeals().renderAllMealsFunction(meals);
        loader.hide();
      });
    });
  }
}

export default ActiveAreaBtns;

import RenderMealsAreas from "./renderMealsAreas.js";

class ActiveAreaBtns {
  static activeBtnsFunction() {
    const container = new RenderMealsAreas().container;
    const buttons = container.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
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
      });
    });
  }
}

export default ActiveAreaBtns;

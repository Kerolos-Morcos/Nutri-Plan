class ViewToggle {
  static changeView() {
    const gridBtn = document.getElementById("grid-view-btn");
    const listBtn = document.getElementById("list-view-btn");
    const grid = document.getElementById("recipes-grid");

    gridBtn.addEventListener("click", () => {
      grid.className = "grid grid-cols-4 gap-5";
      document.querySelectorAll(".recipe-card").forEach((card) => {
        card.classList.remove("flex", "flex-row", "h-40");
        const imgWrapper = card.querySelector(".relative");
        imgWrapper.classList.remove("w-40", "flex-shrink-0");
      });
      gridBtn.classList.add("bg-white", "shadow-sm");
      listBtn.classList.remove("bg-white", "shadow-sm");
    });

    listBtn.addEventListener("click", () => {
      grid.className = "grid grid-cols-2 gap-4";
      document.querySelectorAll(".recipe-card").forEach((card) => {
        card.classList.add("flex", "flex-row", "h-40");
        const imgWrapper = card.querySelector(".relative");
        imgWrapper.classList.add("w-40", "flex-shrink-0");
      });
      listBtn.classList.add("bg-white", "shadow-sm");
      gridBtn.classList.remove("bg-white", "shadow-sm");
    });
  }
}

export default ViewToggle;

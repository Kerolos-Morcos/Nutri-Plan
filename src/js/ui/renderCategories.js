import FetchMealCategories from "../api/fetchCategories.js";

const Category_UI = {
  Beef: {
    cardBg: "from-red-50 to-rose-50 border-red-200 hover:border-red-400",
    iconBg: "from-red-400 to-rose-500",
    icon: "fa-drumstick-bite",
  },
  Chicken: {
    cardBg:
      "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
    iconBg: "from-amber-400 to-orange-500",
    icon: "fa-drumstick-bite",
  },
  Dessert: {
    cardBg: "from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400",
    iconBg: "from-pink-400 to-rose-500",
    icon: "fa-cake-candles",
  },
  Lamb: {
    cardBg:
      "from-orange-50 to-amber-50 border-orange-200 hover:border-orange-400",
    iconBg: "from-orange-400 to-amber-500",
    icon: "fa-drumstick-bite",
  },
  Miscellaneous: {
    cardBg: "from-slate-50 to-gray-50 border-slate-200 hover:border-slate-400",
    iconBg: "from-slate-400 to-gray-500",
    icon: "fa-bowl-rice",
  },
  Pasta: {
    cardBg:
      "from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400",
    iconBg: "from-yellow-400 to-amber-500",
    icon: "fa-bowl-food",
  },
  Pork: {
    cardBg: "from-rose-50 to-red-50 border-rose-200 hover:border-rose-400",
    iconBg: "from-rose-400 to-red-500",
    icon: "fa-bacon",
  },
  Seafood: {
    cardBg: "from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-400",
    iconBg: "from-cyan-400 to-blue-500",
    icon: "fa-fish",
  },
  Side: {
    cardBg:
      "from-green-50 to-emerald-50 border-green-200 hover:border-green-400",
    iconBg: "from-green-400 to-emerald-500",
    icon: "fa-plate-wheat",
  },
  Starter: {
    cardBg: "from-teal-50 to-cyan-50 border-teal-200 hover:border-teal-400",
    iconBg: "from-teal-400 to-cyan-500",
    icon: "fa-utensils",
  },
  Vegan: {
    cardBg:
      "from-emerald-50 to-green-50 border-emerald-200 hover:border-emerald-400",
    iconBg: "from-emerald-400 to-green-500",
    icon: "fa-leaf",
  },
  Vegetarian: {
    cardBg: "from-lime-50 to-green-50 border-lime-200 hover:border-lime-400",
    iconBg: "from-teal-400 to-cyan-500",
    icon: "fa-seedling",
  },
};

class RenderCategories {
  async renderCategoriesFunction() {
    const categories = await FetchMealCategories.fetchMealCategoriesFunction();
    const container = document.getElementById("categories-grid");

    container.innerHTML = categories
      .slice(0, 12)
      .map((cat) => {
        const catStyle = Category_UI[cat.name] || Category_UI["Starter"];
        return `
          <div
            class="category-card bg-gradient-to-br ${
              catStyle.cardBg || ""
            } rounded-xl p-3 border hover:shadow-md cursor-pointer transition-all group"
            data-category="${cat.name}"
          >
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 bg-gradient-to-br ${
                catStyle.iconBg || ""
              } rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                <i class="fa-solid ${catStyle.icon} text-white text-sm"></i>
              </div>
              <h3 class="text-sm font-bold text-gray-900">${cat.name}</h3>
            </div>
          </div>
        `;
      })
      .join("");
  }
}

export default RenderCategories;

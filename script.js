const sampleMeals = {
  balanced: [
    { name: "Oatmeal", ingredients: ["oats", "milk", "banana"] },
    { name: "Chicken Salad", ingredients: ["chicken", "lettuce", "tomato"] },
    { name: "Grilled Fish", ingredients: ["fish", "lemon", "broccoli"] }
  ],
  vegetarian: [
    { name: "Avocado Toast", ingredients: ["bread", "avocado"] },
    { name: "Lentil Bowl", ingredients: ["lentils", "spinach", "carrot"] },
    { name: "Veggie Stir-fry", ingredients: ["tofu", "broccoli", "soy sauce"] }
  ],
  keto: [
    { name: "Egg Muffins", ingredients: ["eggs", "cheese", "spinach"] },
    { name: "Zucchini Noodles", ingredients: ["zucchini", "olive oil", "parmesan"] },
    { name: "Cauliflower Rice", ingredients: ["cauliflower", "chicken", "garlic"] }
  ]
};

document.getElementById("preferences-form").addEventListener("submit", e => {
  e.preventDefault();
  const prefs = Object.fromEntries(new FormData(e.target));
  generateMealPlan(prefs);
});

function generateMealPlan({ diet }) {
  const meals = sampleMeals[diet] || [];
  const mealPlan = document.getElementById("meal-plan");
  mealPlan.innerHTML = "";
  meals.forEach((meal, i) => {
    const card = document.createElement("div");
    card.className = "meal-card";
    card.innerHTML = `
      <h3>${meal.name}</h3>
      <p>Ingredients: ${meal.ingredients.join(", ")}</p>
      <button onclick="swapMeal(${i}, '${diet}')">Swap</button>
    `;
    mealPlan.appendChild(card);
  });
  generateGroceryList(meals);
}

function swapMeal(index, diet) {
  const options = sampleMeals[diet];
  const random = options[Math.floor(Math.random() * options.length)];
  const cards = document.querySelectorAll(".meal-card");
  cards[index].querySelector("h3").textContent = random.name;
  cards[index].querySelector("p").textContent = `Ingredients: ${random.ingredients.join(", ")}`;
  generateGroceryList([...document.querySelectorAll(".meal-card")].map(card => {
    const name = card.querySelector("h3").textContent;
    return options.find(m => m.name === name);
  }));
}

function generateGroceryList(meals) {
  const list = new Set();
  meals.forEach(meal => meal.ingredients.forEach(i => list.add(i)));
  document.getElementById("grocery-list").textContent = [...list].join("\n");
}

document.getElementById("export-list").addEventListener("click", () => {
  const text = document.getElementById("grocery-list").textContent;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "grocery-list.txt";
  link.click();
});

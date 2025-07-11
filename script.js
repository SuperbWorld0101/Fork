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



// Replace this with your actual Spoonacular API key
const API_KEY = "0623d3960f3b4422a1c3eb794f6de7f9";

const preferencesForm = document.getElementById("preferences-form");
const mealPlanSection = document.getElementById("meal-plan");
const groceryListSection = document.getElementById("grocery-list");
const exportButton = document.getElementById("export-list");

preferencesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(preferencesForm);
  const calories = formData.get("calories") || 2000;
  const diet = formData.get("diet") || "balanced";

  const planUrl = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${calories}&diet=${diet}&apiKey=${API_KEY}`;

  const planRes = await fetch(planUrl);
  const planData = await planRes.json();
  const meals = planData.meals || [];

  mealPlanSection.innerHTML = "";
  let allIngredients = [];

  for (const meal of meals) {
    const mealRes = await fetch(`https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${API_KEY}`);
    const mealInfo = await mealRes.json();

    const card = document.createElement("div");
    card.className = "meal-card";
    card.innerHTML = `
      <h3>${meal.title}</h3>
      <img src="${meal.image}" alt="${meal.title}" style="width:100%; border-radius:8px; margin: 10px 0;" />
      <p><strong>Ready in:</strong> ${meal.readyInMinutes} minutes</p>
      <p><strong>Servings:</strong> ${meal.servings}</p>
      <p><strong>Ingredients:</strong> ${mealInfo.extendedIngredients.map(ing => ing.original).join(", ")}</p>
    `;
    mealPlanSection.appendChild(card);
    allIngredients.push(...mealInfo.extendedIngredients.map(ing => ing.original));
  }

  generateGroceryList(allIngredients);
});

function generateGroceryList(ingredients) {
  const uniqueIngredients = [...new Set(ingredients)];
  groceryListSection.textContent = uniqueIngredients.join("\n");
}

exportButton.addEventListener("click", () => {
  const text = groceryListSection.textContent;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "grocery-list.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

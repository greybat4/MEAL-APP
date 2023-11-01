// accessing html tags & classes using querySelector in const variable
const searchBox = document.querySelector(".me-2");
const searchButton = document.querySelector(".btn-outline-success");
const favoriteBox = document.querySelector(".btn-danger");
const recipeContainer = document.querySelector(".recipe-container");
const bodyContainer = document.querySelector(".main");
const recipeDetails = document.querySelector(".recipe-details");
const ingrediantSection = document.querySelector(".ingrediants-section");
const recipeCloseButton = document.querySelector(".ingrediants-close-btn");
let favMeals = [];

console.log(favMeals);
if (!localStorage.getItem("favMeals")) {
  localStorage.setItem("favMeals", JSON.stringify(favMeals));
} else {
  favMeals = JSON.parse(localStorage.getItem("favMeals"));
}
console.log(localStorage.getItem("favMeals"));

// function to get recipe after click event and it runs async
const fetchRecipes = async (query) => {
  recipeContainer.innerHTML = "<h1>Searching Recipes....</h1>";
  try {
    // fetching data from mealDB api using fetch
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    // fetch return promise in data variable
    // so we need to convert the promise into json and store it in response variable
    const response = await data.json();
    // console.log(response);

    recipeContainer.innerHTML = "";
    response.meals.forEach((meal) => {
      // creating element in js using crete element function
      const recipeDiv = document.createElement("div");
      // adding class in div for styling
      recipeDiv.classList.add("recipe");
      //  meal.strmealThumb is the thumbnail image from api
      recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Cuisine </p>
            <p>Belongs To  <span>${meal.strCategory}</span>  Category </p>
            `;
      const readMoreButton = document.createElement("button");
      const favoriteButton = document.createElement("button");
      favoriteButton.innerHTML =
        '<i class="fa-regular fa-heart" style="color: #ff1a1a;"></i> Add to Favorites';
      readMoreButton.textContent = "View Recipe";
      // appending view recipe button to recipeDiv
      recipeDiv.appendChild(readMoreButton);
      recipeDiv.appendChild(favoriteButton);

      // adding EventListener to view Recipe button
      readMoreButton.addEventListener("click", () => {
        openRecipePopup(meal);
      });

      // adding EventListener to view FavoriteButton section
      favoriteButton.addEventListener("click", () => {
        console.log(meal);
        addtoFavoriteSection(meal);
      });

      // append recipeDiv(div) to html div(recipe-container)
      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h1>Error in Searching Recipes....</h1>";
  }
};

// adding meal to the Favorite section when this function is being called
const addtoFavoriteSection = (meal) => {
  // Check if favMeals already includes a meal with the same idMeal
  console.log("favMeals", favMeals);
  console.log("meal", meal);
  const isMealInFavorites = favMeals.some(
    (favMeal) => favMeal.idMeal === meal.idMeal
  );
  if (meal && !isMealInFavorites) {
    favMeals.push(meal);
    localStorage.setItem("favMeals", JSON.stringify(favMeals));
    console.log("Adding meal to favorites:", meal);
    alert(`${meal.strMeal} added to your favorites.`);
  } else if (meal) {
    alert(`${meal.strMeal} is Already in Favorites-List`);
  }
};

// handling the click event of the favoriteBox button onClick
favoriteBox.addEventListener("click", () => {
  displayFavMeals();
});

// function to fatch Ingrediants
const fetchIngredients = (meal) => {
  // console.log(meal);
  let ingredientsList = "";
  for (let i = 1; i < 21; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

// arrow function for eventListener(openRecipePopup)
const openRecipePopup = (meal) => {
  ingrediantSection.innerHTML = `
        <h2 class="racipeName">${meal.strMeal}</h2>
        <h3>Ingrediants: </h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>  
        <div class="recipeInstructions">
            <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
  ingrediantSection.parentElement.style.display = "block";
};

recipeCloseButton.addEventListener("click", () => {
  ingrediantSection.parentElement.style.display = "none";
});

// arrow function for event listener(search input of the box)
searchBox.addEventListener("input", (e) => {
  // preventing the default behavior of submit button
  e.preventDefault();
  // using searchBox input value to store in searchInput Variable to remove extra spaces we are using trim function
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the meal in the search-Box.</h2>`;
    return;
  }
  // calling function with search input arguments
  fetchRecipes(searchInput);
  // console.log("search box event listener running ");
});

// arrow function for event listener(search Button)
searchButton.addEventListener("click", (e) => {
  // preventing the default behavior of submit button
  e.preventDefault();
  // using searchBox input value to store in searchInput Variable to remove extra spaces we are using trim function
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2>Type the meal in the search-Box.</h2>`;
    return;
  }
  // calling function with search input arguments
  fetchRecipes(searchInput);
  // console.log("search box event listener running ");
});

async function displayFavMeals() {
  recipeContainer.innerHTML = `<img src="https://img.freepik.com/free-vector/restaurant-mural-wallpaper_23-2148706001.jpg?w=996&t=st=1698835247~exp=1698835847~hmac=82673d905e8a6eb7b46605079d4b17740ed2af5e4aaef00de8a3553c91f08a64" alt="fav-background"`;
  for (let meal of favMeals) {
    if (meal) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}`
      );
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        let mealData = data.meals[0];

        if (mealData && mealData.strMeal) {
          const favoriteSectionDiv = document.createElement("div");
          favoriteSectionDiv.classList.add("recipe");
          favoriteSectionDiv.innerHTML = `
          <img src="${mealData.strMealThumb}">
          <h3>${mealData.strMeal}</h3>
          <p><span>${mealData.strArea}</span> Cuisine </p>
          <p>Belongs To  <span>${mealData.strCategory}</span>  Category </p>
        `;

          const readMoreButton = document.createElement("button");
          const removeButton = document.createElement("button");
          removeButton.innerHTML =
            '<i class="fas fa-trash"></i> Remove from Favorites';
          readMoreButton.textContent = "View Recipe";
          favoriteSectionDiv.appendChild(readMoreButton);
          recipeContainer.append(favoriteSectionDiv);
          favoriteSectionDiv.appendChild(removeButton);

          readMoreButton.addEventListener("click", () => {
            openRecipePopup(mealData);
          });

          removeButton.addEventListener("click", () => {
            console.log(mealData);
            removeFavorite(meal);
          });
          readMoreButton.addEventListener("click", () => {
            openRecipePopup(meal);
          });
          recipeCloseButton.addEventListener("click", () => {
            ingrediantSection.parentElement.style.display = "none";
          });
        } else {
          console.log(`Invalid data for meal: ${JSON.stringify(mealData)}`);
        }
      } else {
        console.log(`No meals found for: ${meal.strMeal}`);
        break;
      }
    }
  }
}
// recipeContainer.appendChild(removeFavorite);
console.log(favMeals);
// function for remove meal from favorite section
function removeFavorite(meal) {
  if (meal !== null) {
    const mealIndex = favMeals.findIndex((fav) => fav.idMeal === meal.idMeal);
    if (mealIndex !== -1) {
      favMeals.splice(mealIndex, 1);
      localStorage.setItem("favMeals", JSON.stringify(favMeals));
      displayFavMeals();
      alert(`${meal.strMeal} has been removed from favorites`);
    }
  }
}

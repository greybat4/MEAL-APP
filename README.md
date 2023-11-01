I am creating a Meal finder application using the TheMeal API: https://www.themealdb.com/api.php

My providng input in the searchBox it will search and fetch from the API with the related keyword which we are providing to it if we found with related keyword it will return us the DATA and i am designing the resonse page accordingly so it's UI looks good.

There are various function i am using in JavaScript but first i am creating the variables fromm the HTML class and Elements so i can add functionality over the elements using JS,

1. fetchRecipes => Arrow function which is fetching the data from the API and taking query(searchBox input) as a input and if input keyword is present it will show us the list of it, if not it will catch and throw us error.

   The data we get in json format so we have to display it on our site we loop over that data and by createElement we creating a "div" and store data over there which is recipeDiv and we are storing img, mealname, meal location which is famous for, belongs to which category.

   Adding a readMoreButton so we can read all the indredients required to make that dish and also adding favorite button so we can add it into our favorite list.

   Adding EventListener to readMoreButton so it can be visible in pop-up

2. fetchIngredients => Function to fetch Ingrediants in the ingredientsList variable we are storing the Ingredients, after adding 20 indredients we will return from the loop and returns the ingredientsList.

3. openRecipePopup=> arrow function for eventListener(openRecipePopup) after clicking to view-recipe this function is called and we are showing the ingredients list with a good style which i am designed using CSS its display will be block as per parentElement .

4. searchBox.addEventListener('input', (e)=> arrow function for event listener(search Button) using this eventListener we call fetchRecipes() function with the input value of the searchBox and same goes with searchButton if we click on searchButton it also calling the same fetchRecipes function.

5. addtoFavoriteSection => this function is adding the meal into the favorite section which is favMeals Array and before including it it will check it there is already a meal present it or not if presenting its throw an error in the browser

   There is favorite button (favoriteBox) when we click on it it will display the favMeals using the displayFavMeals(); function

6. displayFavMeals=> this function displaying the data we stored in favMeals Array and i created a view recipe and remove from favorite button in this section so we can remove meal from the favorite section using removeFavorite() function.

7. removeFavorite() this function is taking a meal as arguments and with mealIndex if it's not === -1 it will splice that perticular index and a alert is poping in the browser.

Key Features

Search Meal by name
Auto search on just input's
Save favrouite meals for future use
Ability to restore saved meals even after reopening the browser
Works seamlessly on both mobile and desktop devices

Installing

Clone or download the repository to your local machine
Open the project in your code editor
Open the index.html file in your web browser to run the app

Built With

HTML
CSS
Bootstrap
JavaScript

Demo=> live demo of the application at https://greybat4.github.io/MEAL-APP/

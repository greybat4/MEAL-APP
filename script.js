// accessing html tags & classes using querySelector in const variable
const searchBox = document.querySelector('.me-2');
const searchButton = document.querySelector('.btn-outline-success');
const favoriteBox = document.querySelector('.btn-danger');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetails = document.querySelector('.recipe-details');
const ingrediantSection = document.querySelector('.ingrediants-section');
const recipeCloseButton = document.querySelector('.ingrediants-close-btn');

// function to get recipe after click event and it runs async
const fetchRecipes = async (query)=> {
    recipeContainer.innerHTML="<h1>Searching Recipes....</h1>";
    try{
    // fetching data from mealDB api using fetch 
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    // fetch return promise in data variable
    // so we need to convert the promise into json and store it in response variable
    const response = await data.json();
    // console.log(response);

    recipeContainer.innerHTML="";
    response.meals.forEach(meal =>{ 
        // creating element in js using crete element function
        const recipeDiv = document.createElement('div');
        // adding class in div for styling 
        recipeDiv.classList.add('recipe');
        //  meal.strmealThumb is the thumbnail image from api 
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Cuisine </p>
            <p>Belongs To  <span>${meal.strCategory}</span>  Category </p>
            `
        const readMoreButton = document.createElement('button'); 
        readMoreButton.textContent = "View Recipe";
        // appending view recipe button to recipeDiv
        recipeDiv.appendChild(readMoreButton)

        // adding EventListener to view Recipe button 
        readMoreButton.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });

        // append recipeDiv(div) to html div(recipe-container)
        recipeContainer.appendChild(recipeDiv);
    });
    }catch(error){
        recipeContainer.innerHTML="<h1>Error in Searching Recipes....</h1>";
    }
}

// function to fatch Ingrediants
const fetchIngredients= (meal)=>{
    // console.log(meal);
    let ingredientsList = "";
    for(let i=1; i<21; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

// arrow function for eventListener(openRecipePopup)
const openRecipePopup = (meal)=> {
    ingrediantSection.innerHTML = `
        <h2 class="racipeName">${meal.strMeal}</h2>
        <h3>Ingrediants: </h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>  
        <div class="recipeInstructions">
            <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
        </div>
    ` 
    ingrediantSection.parentElement.style.display = "block";
}

    recipeCloseButton.addEventListener('click', ()  => {
        ingrediantSection.parentElement.style.display = "none";
    });


// arrow function for event listener(search Button)
    searchBox.addEventListener('input', (e)=>{
        // preventing the default behavior of submit button
        e.preventDefault();
        // using searchBox input value to store in searchInput Variable to remove extra spaces we are using trim function
        const searchInput = searchBox.value.trim();
        if(!searchInput){
            recipeContainer.innerHTML= `<h2>Type the meal in the search-Box.</h2>`
            return;
        }
        // calling function with search input arguments
        fetchRecipes(searchInput);
        // console.log("search box event listener running ");
    });

    // arrow function for event listener(search Button)
    searchButton.addEventListener('click', (e)=>{
        // preventing the default behavior of submit button
        e.preventDefault();
        // using searchBox input value to store in searchInput Variable to remove extra spaces we are using trim function
        const searchInput = searchBox.value.trim();
        if(!searchInput){
            recipeContainer.innerHTML= `<h2>Type the meal in the search-Box.</h2>`
            return;
        }
        // calling function with search input arguments
        fetchRecipes(searchInput);
        // console.log("search box event listener running ");
    });



   
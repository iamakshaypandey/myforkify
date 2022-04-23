import * as model from './model.js'
import { MODEL_CLOSE_SEC } from './config.js';
import recipeview from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';



import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { async } from 'regenerator-runtime/runtime';

// if(module.hot){
//   module.hot.accept();
// }


// console.log(Icons,'akshay');

// const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


// console.log('Test');


const controlRecipes = async function(){
  try {
    // resultsView.renderSpinner()
    // console.log(resultsView,'resultsview');
    const id = window.location.hash.slice(1)
    // console.log(id);
    if(!id) return  
    recipeview.renderSpinner()

    //0)upadate result view to mark selected search result
    // resultsView.render(model.getSearchResultsPage())
    resultsView.update(model.getSearchResultsPage())
    
    //2) updating bookmarks view
    // console.log(model.state.bookmark);
    bookmarksView.update(model.state.bookmark)
    
    //2) loding recipe
    await model.lodeRecipe(id)
    // const {recipe} = model.state
    
    //3)rendering recipe
    recipeview.render(model.state.recipe)

    // debugger;
  // //test servings
  // controlServing()
 
  }catch(err){
    recipeview.renderError()
    console.log(err);
    
  }
}

const controlSearchResults = async function(){
  try{
    //1 get search query
    const query = searchView.getQuery();
    if(!query)return; 

   //2 load search results

   console.log(model.state.search.results,'data comes hear');
   await model.loadSearchResults(query)
   //3 render search results
  //  resultsView.render(model.state.search.results)
   resultsView.render(model.getSearchResultsPage())

   // render initial pagination buttons

   paginationView.render(model.state.search)


  }catch(err){
    console.log(err);
  }
}
// controlSearchResults()

const controlPagination = function(goto){
  // console.log(goto);
  // render new results
  resultsView.render(model.getSearchResultsPage(goto))

   // render new initial pagination buttons

   paginationView.render(model.state.search)
}


const controlServing = function(newServings){
  // update the recipe service in the state
  console.log('updat is calling',newServings);

  model.updateServings(newServings)

  // update the recipe view 
  // recipeview.render(model.state.recipe)  
  recipeview.update(model.state.recipe)

  
}

const controlAddBookmark = function(){

  // add and remove bookmarks 

  // console.log('check bookmarked',model.state.recipe.bookmarked);
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  // console.log(model.state.recipe);
  // update recipe view

  recipeview.update(model.state.recipe)

  // 3rd Render bookMarks means show recipe inside using render class
  bookmarksView.render(model.state.bookmark)
}


const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmark)
}


// debugger
const controlAddRecipe = async function(newRecipe){
  // console.log(newRecipe);
  try{

    // show loding spener
    addRecipeView.renderSpinner()
    debugger

    console.log(model.state.recipe,'yes');
   await model.uplodeRecipe(newRecipe)

  //  render recipe
  recipeview.render(model.state.recipe)
  
  // success message
  // debugger
  addRecipeView.renderMessage()


  // render bookmarks view

  bookmarksView.render(model.state.bookmark)


  // change id in url 
  window.history.pushState(null,'',`${model.state.recipe.id}`)

  // close for window
  setTimeout(() => {
    // addRecipeView.toggleWindow()
  }, MODEL_CLOSE_SEC *1000);


  }catch(err){
    console.error(err);
    addRecipeView.renderError(err.message)
  }
  //uplode a new recipe data 
}


const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeview.addHandlerRender(controlRecipes)
  recipeview.addHandlerUpdateservings(controlServing)
  recipeview.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUplode(controlAddRecipe)
}
init()

// window.addEventListener('hashchange',controlRecipes)
// window.addEventListener('load',controlRecipes)




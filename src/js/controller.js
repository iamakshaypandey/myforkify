import * as model from './model.js'
import recipeview from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';



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
    resultsView.renderSpinner()
    // console.log(resultsView,'resultsview');
    const id = window.location.hash.slice(1)
    // console.log(id);
    if(!id) return  
    recipeview.renderSpinner()

    //0)upadate result view to mark selected search result
    resultsView.render(model.getSearchResultsPage())
    // resultsView.update(model.getSearchResultsPage())


    //1) loding recipe
    await model.lodeRecipe(id)
    // const {recipe} = model.state

    //2)rendering recipe
    recipeview.render(model.state.recipe)
    
  // //test servings
  // controlServing()
 
  }catch(err){
    console.log(err);
    recipeview.renderError()
  }
}

const controlSearchResults = async function(){
  try{
    //1 get search query
    const query = searchView.getQuery();
    if(!query)return; 

   //2 load search results

   await model.loadSearchResults(query)
   //3 render search results
   console.log(model.state.search.results,'data comes hear');
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

  model.updateServings(newServings)

  // update the recipe view 
  recipeview.render(model.state.recipe)  
  // recipeview.update(model.state.recipe)

  
}

const controlAddBookmark = function(){
  model.addBookmark(model.state.recipe)
  console.log(model.state.recipe);
}


const init = function(){
  recipeview.addHandlerRender(controlRecipes)
  recipeview.addHandlerUpdateservings(controlServing)
  recipeview.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
}
init()

// window.addEventListener('hashchange',controlRecipes)
// window.addEventListener('load',controlRecipes)




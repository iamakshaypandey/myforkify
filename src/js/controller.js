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
    //1) loding recipe
    await model.lodeRecipe(id)
    // const {recipe} = model.state

    //2)rendering recipe
    recipeview.render(model.state.recipe)
    
    
    
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
   resultsView.render(model.getSearchResultsPage(3))

   // render initial pagination buttons

   paginationView.render(model.state.search)


  }catch(err){
    console.log(err);
  }
}
// controlSearchResults()

const init = function(){
  recipeview.addHandlerRender(controlRecipes)
  searchView.addHandlerSearch(controlSearchResults)
}
init()

// window.addEventListener('hashchange',controlRecipes)
// window.addEventListener('load',controlRecipes)




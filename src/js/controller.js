import * as model from './model.js'
import recipeview from './views/recipeview.js';


import 'core-js/stable'
import 'regenerator-runtime/runtime'
// console.log(Icons,'akshay');

const recipeContainer = document.querySelector('.recipe');



// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


// console.log('Test');


const controlRecipes = async function(){
  try {
    const id = window.location.hash.slice(1)
    console.log(id);
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

const init = function(){
  recipeview.addHandlerRender(controlRecipes)
}
init()

// window.addEventListener('hashchange',controlRecipes)
// window.addEventListener('load',controlRecipes)




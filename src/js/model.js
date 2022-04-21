import { async } from "regenerator-runtime"
import { API_URL ,RES_PER_PAGE} from "./config.js"
import { getJSON } from "./helper.js"

export const state = {
    recipe:{},
    search:{
        query:'',
        results:[],
        page:1,
        resultsPerPage: RES_PER_PAGE
    },
    bookmark: [],
}

export const lodeRecipe = async function(id){
    try{
    const data= await getJSON(`${API_URL}${id}`)

    const {recipe} = data.data;

    state.recipe={
      id:recipe.id,
      title:recipe.title,
      publisher:recipe.publisher,
      shourceUrl:recipe.source_url,
      image:recipe.image_url,
      servings:recipe.servings,
      cookingTime:recipe.cooking_time,
      ingredients:recipe.ingredients
    }
    // console.log(state.recipe);
}catch(err){
    console.error(`${err}***************`);
    throw err;
}
}


export const loadSearchResults = async function(query){
    try{
        state.search.query=query
        const data = await getJSON(`${API_URL}?search=${query}`)
        // console.log(data.data.recipes,'hyyy akshay ');
        state.search.results=data.data.recipes.map(res=>{
            return {
        id:res.id,
        title:res.title,
        publisher:res.publisher,
        image:res.image_url,
            }
        })
        // console.log(state.search.results);
        state.search.page = 1; 

    }catch(err){
        console.error(`${err}*******`);
        throw err;
    }
}



export const getSearchResultsPage = function(page=state.search.page){
    state.search.page=page;
    const start =(page -1)* state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    console.log(start,end);
    return  state.search.results.slice(start,end)
}


// exporting model service function to controller.js

export const updateServings = function(newServings){
    //updeting a new ingridiaents
    state.recipe.ingredients.forEach(ing =>{
        ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
        // newqty = oldqty * newservings / oldservings // 2 * 8 / 4 = 4
    });
    state.recipe.servings = newServings
}


export const addBookmark = function(recipe){
    // add bookmark 
    state.bookmark.push(recipe)

    // mark current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

}
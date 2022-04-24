import { async } from "regenerator-runtime"
import { API_URL ,RES_PER_PAGE,KEY} from "./config.js"
// import { getJSON ,sendJSON } from "./helper.js"
import { AJAX} from "./helper.js"


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

const createRecipeObjects = function(data){
    const {recipe}=data.data

       return {
        id:recipe.id,
        title:recipe.title,
        publisher:recipe.publisher,
        shourceUrl:recipe.source_url,
        image:recipe.image_url,
        servings:recipe.servings,
        cookingTime:recipe.cooking_time,
        ingredients:recipe.ingredients,
        ...(recipe.key && {key: recipe.key}),
      }
}


export const lodeRecipe = async function(id){
    try{
    const data= await AJAX(`${API_URL}${id}?key=${KEY}`)

    state.recipe = createRecipeObjects(data)

    
    
    if(state.bookmark.some(bookmark => bookmark.id === id)){
        state.recipe.bookmarked = true ;
    }
    else state.recipe.bookmarked = false;
    
}catch(err){
    console.error(`${err}***************`);
    throw err;
}
}


export const loadSearchResults = async function(query){
    try{
        state.search.query=query
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`)
        
        state.search.results=data.data.recipes.map(res=>{
        
            return {
        id:res.id,
        title:res.title,
        publisher:res.publisher,
        image:res.image_url,
        ...(res.key && {key: res.key}),

            }
        })
        
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



const persistBookMarks = function(){
    localStorage.setItem('bookmarks',JSON.stringify(state.bookmark))
}


export const addBookmark = function(recipe){
    // add bookmark 
    state.bookmark.push(recipe)


    // mark current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookMarks()

}



export const deleteBookmark = function(id){
    //delete bookmarks
    const index = state.bookmark.findIndex(el => el.id === id);
    state.bookmark.splice(index,1)

    //mark current recipe as not bookmarked

    if(id ===  state.recipe.id) state.recipe.bookmarked = false

    persistBookMarks()

}


const init = function(){
    const storege = localStorage.getItem('bookmarks')
    if(storege) state.bookmark = JSON.parse(storege)

}
init()



const clearbookmarks = function(){
    localStorage.clear('bookmarks');
  }
//   clearbookmarks()

// debugger
export const uplodeRecipe = async function(newRecipe){
    try{
        const ingredients = Object.entries(newRecipe)
        .filter(entry=>entry[0].startsWith('ingredient')&&entry[1]!=='')
        .map(ing=>{
            const ingArr = ing[1].split(',').map(el=> el.trim())
            // const ingArr = ing[1].replaceAll(' ','').split(',')
            
            
            if(ingArr.length !== 3)
            
            throw new Error (
                'wrong ingridients formate please use right formate:'
                )
                
        const [quantity,unit,description]=ingArr
    
        return  {quantity: quantity ? +quantity : null,unit,description}
    })


    

    // const recipe ={
    //   title:newRecipe.title,
    //   shource_Url:newRecipe.source_url,
    //   image_url:newRecipe.image_url,
    //   publisher:newRecipe.publisher,
    //   servings: +newRecipe.servings,
    //   cooking_Time: +newRecipe.cooking_time,
    //   ingrid,
    // }

    // debugger
    const recipe = {
        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +newRecipe.cookingTime,
        servings: +newRecipe.servings,
        ingredients,
    }
    

    const data = await AJAX(`${API_URL}?key=${KEY}`,recipe)
    
    state.recipe = createRecipeObjects(data)
    addBookmark(state.recipe)





    }catch(err){
        throw err
    }

}
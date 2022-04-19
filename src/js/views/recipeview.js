import Icons from 'url:../../img/icons.svg';
import {Fraction} from 'fractional';
console.log(Fraction);

class RecipeView{
    #parentElement = document.querySelector('.recipe');
    #data
    #errorMessage = `we dont find that recipe . please try onther way`
    #Message = ''
    render(data){
        this.#data = data;
        console.log(data,'hello akshay');
        const markup = this.#generateMarkup();
        this.#clear
       this.#parentElement.insertAdjacentHTML("afterbegin",markup)
    }
    #clear(){
        this.#parentElement.innerHTML = ''
    }
    renderSpinner = function(){
        const markup=`
        <div class="spinner">
        <svg>
          <use href="${Icons}#icon-loader"></use>
        </svg>
        </div>`
        this.#clear()
        this.#parentElement.insertAdjacentHTML('afterbegin',markup)
      };

    renderError(message = this.#errorMessage){
      const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${Icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
        this.#clear()
        this.#parentElement.insertAdjacentHTML('afterbegin',markup)
    }

    renderMessage(message = this.#Message){
      const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${Icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
        this.#clear()
        this.#parentElement.insertAdjacentHTML('afterbegin',markup)
    }
      
    #generateMarkup(){
      return `
        <figure class="recipe__fig">
        <img src="${this.#data.image}" alt="Tomato" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this.#data.title}>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${Icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${Icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${Icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${Icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${Icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${Icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${this.#data.ingredients.map(this.#generateMarkupIngredient).join('')}
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this.#data.shourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${Icons}#icon-arrow-right"></use>
          </svg>
        </a>
        </div>`
    }
    

    addHandlerRender(handler){
      const arr=['hashchange','load'];
      arr.forEach(ev=>window.addEventListener(ev,handler))
    }

    #generateMarkupIngredient(ing){
      return `
              <li class="recipe__ingredient">
                <svg class="recipe__icon">
                  <use href="${Icons}#icon-check"></use>
                </svg>
                <div class="recipe__quantity">${ing.quantity ? new Fraction(ing.quantity) : ''}</div>
                <div class="recipe__description">
                  <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
                </div>
              </li>`
    }
}



export default new RecipeView();
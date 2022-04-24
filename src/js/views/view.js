import Icons from 'url:../../img/icons.svg'; //parcel2




export default class view{
    _data

    //
    /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Jonas Schmedtmann
   * @todo Finish implementation
   */


    render(data,render = true){
      
        if(!data || (Array.isArray(data) && data.length === 0))return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        
        if(!render) return markup;
        this._clear()
        this._parentElement.insertAdjacentHTML("afterbegin",markup)
      }
      
      update(data){
        // if(!data || (Array.isArray(data) && data.length === 0))return this.renderError();
        this._data = data;
        
        const newMarkup = this._generateMarkup();
        
      

        const newDom = document.createRange().createContextualFragment(newMarkup);
        
        
        const newElements = Array.from(newDom.querySelectorAll('*'))
        const curElement = Array.from(this._parentElement.querySelectorAll('*'))
      
        
        newElements.forEach((newEl,i)=>{
          const curEL = curElement[i]
        

          // update change text
          if(!newEl.isEqualNode(curEL) &&
           newEl.firstChild?.nodeValue.trim() !== ''){
        
          curEL.textContent = newEl.textContent
           }

          // update change attributes
          if(!newEl.isEqualNode(curEL)){
            
          Array.from(newEl.attributes).forEach(attr=>curEL.setAttribute(attr.name,attr.value))
          }
        
        })
    }

    _clear(){
      
        this._parentElement.innerHTML = ''
    }
    renderSpinner = function(){
        const markup=`
        <div class="spinner">
        <svg>
          <use href="${Icons}#icon-loader"></use>
        </svg>
        </div>`
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
      };

    renderError(message = this._errorMessage){
      const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${Icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
        this._clear()
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }

    renderMessage(message = this._message){
      
      const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${Icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`
        this._clear()
        
        this._parentElement.insertAdjacentHTML('afterbegin',markup)
    }
}



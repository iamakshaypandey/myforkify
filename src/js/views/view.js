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
      // console.log('yes its calling');
        if(!data || (Array.isArray(data) && data.length === 0))return this.renderError();

        this._data = data;
        const markup = this._generateMarkup();
        // console.log('hello akshay', markup);
        if(!render) return markup;
        this._clear()
        this._parentElement.insertAdjacentHTML("afterbegin",markup)
      }
      
      update(data){
        // if(!data || (Array.isArray(data) && data.length === 0))return this.renderError();
        this._data = data;
        // console.log(data,'hello akshay1234');
        const newMarkup = this._generateMarkup();
        // console.log(newMarkup);
        // console.log('markup',this._parentElement);

        const newDom = document.createRange().createContextualFragment(newMarkup);
        // console.log(newDom);
        // console.log('hi akshay', this._parentElement);
        const newElements = Array.from(newDom.querySelectorAll('*'))
        const curElement = Array.from(this._parentElement.querySelectorAll('*'))
        // console.log(newElements, 'newelem', data);
        // console.log(curElement, 'curelem', this._parentElement);
        newElements.forEach((newEl,i)=>{
          const curEL = curElement[i]
          // console.log(newEl);
          // console.log(curEL,newEl.isEqualNode(curEL));

          // update change text
          if(!newEl.isEqualNode(curEL) &&
           newEl.firstChild?.nodeValue.trim() !== ''){
          // console.log('****new',newEl.firstChild.nodeValue.trim());
          curEL.textContent = newEl.textContent
           }

          // update change attributes
          if(!newEl.isEqualNode(curEL)){
            // console.log( Array.from(newEl.attributes));
          Array.from(newEl.attributes).forEach(attr=>curEL.setAttribute(attr.name,attr.value))
          }
          //  console.log(newEl.attributes);
        })
    }

    _clear(){
        // console.log(this._parentElement,'check parents element');
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
      // console.log('its calling or not',this._message);
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



import Icons from 'url:../../img/icons.svg'; //parcel2



export default class view{
    _data
    render(data){
        if(!data || (Array.isArray(data) && data.length === 0))return this.renderError();

        this._data = data;
        console.log(data,'hello akshay');
        const markup = this._generateMarkup();
        this._clear
       this._parentElement.insertAdjacentHTML("afterbegin",markup)
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

    renderMessage(message = this._Message){
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



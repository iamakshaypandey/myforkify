import Icons from 'url:../../img/icons.svg'; //parcel2
import view from "./view.js";


class ResultsView extends view{
    _parentElement = document.querySelector('.results')
    _errorMessage = `No recipes found for your query ! please try again`
    _Message = ''

    _generateMarkup(){
        console.log(this._data,'data');
        return this._data.map(this._generateMarkupPrivew).join('')
        
    }
    _generateMarkupPrivew(result){

        const id = window.location.hash.slice(1);
        console.log(`"id"=${id}`);

        return ` 
        <li class="preview">
            <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
            <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
            </div>
            </a>
        </li>
        `

    }
}

export default new ResultsView()
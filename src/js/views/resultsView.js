import view from "./view.js";
import previewView from "./previewView.js";
import Icons from 'url:../../img/icons.svg'; //parcel2


class ResultsView extends view{
    _parentElement = document.querySelector('.results')
    _errorMessage = `No recipes found for your query ! please try again`
    _Message = ''

    _generateMarkup(){
        // console.log(this._data,'data');
        return this._data.map(result => previewView.render(result, false)).join('')
        
    }
}

export default new ResultsView()
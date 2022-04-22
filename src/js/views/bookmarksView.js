import view from "./view.js";
import previewView from "./previewView.js";
import Icons from 'url:../../img/icons.svg'; //parcel2



class BookMarksView extends view{
    _parentElement = document.querySelector('.bookmarks__list')
    _errorMessage = `No BookMarks  yet. find a nice recipe and bookmarks it`
    _Message = ''

    addHandlerRender(handler){
        window.addEventListener('load',handler)
    }

    _generateMarkup(){
        // console.log(this._data,'data');
        return this._data.map(bookmarks => previewView.render(bookmarks, false)).join('')
        
    }
  
}

export default new BookMarksView()
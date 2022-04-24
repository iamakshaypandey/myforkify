import Icons from 'url:../../img/icons.svg'; //parcel2
import view from "./view.js";


class addRecipeView extends view{
    _parentElement = document.querySelector('.upload')
    _message = 'Recipe was successfully uploded:)';

    _window = document.querySelector('.add-recipe-window')
    _overly = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor(){
        super()
        this.addHandlerShowWindow()
        this.addHandlerHideWindow()
    }

    toggleWindow(){
        this._overly.classList.toggle('hidden')
        this._window.classList.toggle('hidden')
    }

    addHandlerShowWindow(){
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this));
    }

    addHandlerHideWindow(){
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
        this._overly.addEventListener('click',this.toggleWindow.bind(this));
    }

    
    
    
    addHandlerUplode(handler){
        this._parentElement.addEventListener('submit',function(e){

            e.preventDefault()
            const dataArr = [...new FormData(this)]
            const data = Object.fromEntries(dataArr)
            
            handler(data);
        })
    }

   

    _generateMarkup(){

    }
}

export default new addRecipeView();
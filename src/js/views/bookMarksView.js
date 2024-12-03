import previewView from "./previewView";
import View from "./view";
import icons from "url:../../img/icons.svg";
class BookMarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMsg = "No bookmarks yet. Find a nice recipe and bookmark it :)";
  _successMsg = "";

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    console.log(this._data);
    return this._data.map((b) => previewView.render(b, false)).join("");
  }
}
export default new BookMarkView();

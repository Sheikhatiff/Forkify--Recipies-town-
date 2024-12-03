import previewView from "./previewView";
import View from "./view";
import icons from "url:../../img/icons.svg";
class ResultsView extends View {
  _parentElement = document.querySelector(".results");
  _errorMsg = "No recipes found for your query. Please try again!";
  _successMsg = "";
  _generateMarkup() {
    return this._data.map((res) => previewView.render(res, false)).join("");
  }
}
export default new ResultsView();

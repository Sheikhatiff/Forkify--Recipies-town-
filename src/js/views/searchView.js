class SearchView {
  _parentElemnet = document.querySelector(".search");

  getQuery() {
    const query = this._parentElemnet.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElemnet.querySelector(".search__field").value = "";
  }
  addHandlerSearch(handler) {
    this._parentElemnet.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();

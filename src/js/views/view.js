import icons from "url:../../img/icons.svg";
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    newElements.forEach((elm, i) => {
      const curEl = curElements[i];
      if (!elm.isEqualNode(curEl) && elm.firstChild?.nodeValue.trim() !== "") {
        curEl.textContent = elm.textContent;
      }
      if (!elm.isEqualNode(curEl)) {
        Array.from(elm.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
  renderSpinner() {
    const html = `<div class="spinner">
                    <svg>
                      <use href="${icons}#icon-loader"></use>
                    </svg>
                  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  renderError(msg = this._errorMsg) {
    const html = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${msg}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
  renderSuccess(msg = this._successMsg) {
    const html = `<div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${msg}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }
}

import View from "./view";
import icons from "url:../../img/icons.svg";
class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  //   _generateMarkup() {
  //     const curPage = this._data.page;
  //     const numPages = Math.ceil(
  //       this._data.results.length / this._data.resultsPerPage
  //     );
  //     if (curPage === 1 && numPages > 1) {
  //       return `<button class="btn--inline pagination__btn--next">
  //             <span>${curPage + 1}</span>
  //             <svg class="search__icon">
  //               <use href="${icons}#icon-arrow-right"></use>
  //             </svg>
  //           </button>`;
  //     }
  //     if (curPage === numPages && numPages > 1) {
  //       return `<button class="btn--inline pagination__btn--prev">
  //             <svg class="search__icon">
  //               <use href="${icons}#icon-arrow-left"></use>
  //             </svg>
  //             <span>${curPage - 1}</span>
  //           </button>`;
  //     }
  //     if (curPage < numPages) {
  //       return `<button class="btn--inline pagination__btn--prev">
  //             <svg class="search__icon">
  //               <use href="${icons}#icon-arrow-left"></use>
  //             </svg>
  //             <span>${curPage - 1}</span>
  //           </button>
  //           <button class="btn--inline pagination__btn--next">
  //             <span>${curPage + 1}</span>
  //             <svg class="search__icon">
  //               <use href="${icons}#icon-arrow-right"></use>
  //             </svg>
  //           </button>`;
  //     }
  //     return "";
  //   }
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(curPage + 1);
    }
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(curPage - 1, "prev");
    }
    if (curPage < numPages) {
      return `${this._generateMarkupButton(
        curPage + 1
      )}${this._generateMarkupButton(curPage - 1, "prev")}`;
    }
    return "";
  }
  _generateMarkupButton(current, type = "next") {
    return `<button data-goto=${current} class="btn--inline pagination__btn--${type}">
            <span>${current}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${
      type === "prev" ? "left" : "right"
    }"></use>
            </svg>
          </button>`;
  }
}

export default new PaginationView();

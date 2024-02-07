import View from "./View.js";

class SearchView extends View {
  _searchForm = document.querySelector(".search__form");
  _section = document.querySelector(".results");

  getUrl() {
    const searchType = this._searchForm.querySelector(
      ".search__form-select"
    ).value;
    const keyWords = this._searchForm.querySelector(
      ".search__form-input"
    ).value;
    this.clearInput();
    return `https://api.github.com/search/${searchType}?q=${keyWords}`;
  }

  clearInput() {
    return (this._searchForm.querySelector(".search__form-input").value = "");
  }

  addHandlerSearch(handler) {
    this._searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const section = document.querySelector(".results");
      section.classList.remove("hidden");
      section.scrollIntoView(top);
      handler();
    });
  }
}

export default new SearchView();

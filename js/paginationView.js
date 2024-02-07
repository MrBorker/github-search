import View from "./view.js";
import { state } from "./model.js";

class PaginationView extends View {
  navPrev = document.querySelector(".results__nav-prev");
  navNext = document.querySelector(".results__nav-next");
  _resultsPerPage;

  generatePagination() {
    const curPage = state.pagination.page;
    const numPages = Math.ceil(
      state.pagination.totalResults / state.pagination.resultsPerPage
    );

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      this.clear(this.navNext);
      this.clear(this.navPrev);
      this.navNext.append(this.renderNavBtn("next"));
      return;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      this.clear(this.navNext);
      this.clear(this.navPrev);
      this.navPrev.append(this.renderNavBtn("prev"));
      return;
    }

    // Middle page
    if (curPage < numPages) {
      this.clear(this.navNext);
      this.clear(this.navPrev);
      this.navNext.append(this.renderNavBtn("next"));
      this.navPrev.append(this.renderNavBtn("prev"));
      return;
    }

    // Page 1, there are no other pages
    if (numPages === 1) {
      this.clear(this.navNext);
      this.clear(this.navPrev);
      return;
    }
  }

  renderNavBtn(option) {
    const navTemplate = document.querySelector("#nav__template");
    const btn = navTemplate.content.cloneNode(true);
    const icon = btn.querySelector(".results__nav-icon");
    icon.src = `./assets/png/${option}-icon-white.png`;
    btn
      .querySelector(".results__nav-btn")
      .classList.add(`results__nav-btn-${option}`);
    return btn;
  }

  addHandlerPagination(handler) {
    this.navNext.addEventListener("click", function (e) {
      e.preventDefault();
      state.pagination.page++;
      handler();
    });
    this.navPrev.addEventListener("click", function (e) {
      e.preventDefault();
      state.pagination.page--;
      handler();
    });
  }
}

export default new PaginationView();

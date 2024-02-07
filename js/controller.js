import * as model from "./model.js";
import searchView from "./searchView.js";
import paginationView from "./paginationView.js";

const controlSearchResults = async function () {
  try {
    model.state.url = searchView.getUrl();
    model.state.results = [];
    model.state.pagination.page = 1;
    model.state.pagination.queryPage = 1;
    model.state.pagination.totalResults = 1;
    paginationView.generatePagination();
    searchView.renderLoader();
    await model.loadQuery(model.state.url);
    paginationView.generatePagination();
    if (!model.state.results.length) {
      searchView.renderError("empty response");
      return;
    }
    searchView.render(model.getResultsPage());
  } catch (err) {
    searchView.renderError(model.state.status);
  }
};

const controlPagination = async function () {
  try {
    searchView.renderLoader();
    await model.loadNextPage();
    paginationView.generatePagination();
    searchView.render(model.getResultsPage());
  } catch (err) {
    searchView.renderError(model.state.status);
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPagination);

  window.addEventListener("resize", function () {
    const firstCase =
      window.matchMedia("screen and (max-width: 705px)").matches && 30;
    const secondCase =
      window.matchMedia("screen and (min-width: 705px) and (max-width: 1067px)")
        .matches && 4;
    const thirdCase =
      window.matchMedia(
        "screen and (min-width: 1067px) and (max-width: 1429px)"
      ).matches && 6;
    const forthCase =
      window.matchMedia("screen and (min-width: 1429px)").matches && 8;
    model.state.pagination.resultsPerPage =
      firstCase || secondCase || thirdCase || forthCase;
    searchView.render(model.getResultsPage());
  });
};

init();

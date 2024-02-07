import { RESULTS_PER_PAGE } from "./config.js";

export const state = {
  results: [],
  pagination: {
    page: 1,
    resultsPerPage: 6,
    queryPage: 1,
    totalResults: 1,
  },
  url: "",
};

export const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    state.status = response.status;
    return data;
  } catch (err) {
    throw err;
  }
};

export const loadQuery = async function (url) {
  try {
    const query = await getJSON(url); // массив объектов
    const results = query.items;
    state.pagination.totalResults = query.total_count;
    results.map((result) => {
      state.results.push({
        name: result.login || result.name,
        avatar: result.avatar_url || result.owner?.avatar_url,
        link: result.html_url,
        info: {
          "type:": result.type,
          "owner:": result.owner?.login,
          "forks:": result.forks,
        },
      });
    });
  } catch (err) {
    throw err;
  }
};

export const getResultsPage = function (page = state.pagination.page) {
  const start = (page - 1) * state.pagination.resultsPerPage;
  const end = page * state.pagination.resultsPerPage;
  return state.results.slice(start, end);
};

export const loadNextPage = async function () {
  try {
    if (
      state.pagination.totalResults >
        state.pagination.page * state.pagination.resultsPerPage &&
      state.results.length <
        state.pagination.page * state.pagination.resultsPerPage
    ) {
      let pageURL = `${state.url}&page=${++state.pagination.queryPage}`;
      await loadQuery(pageURL);
    }
  } catch (err) {
    throw err;
  }
};

export default class View {
  resultsContainer = document.querySelector(".results__container");
  _data;
  render(data) {
    this._data = data;
    this.clear(this.resultsContainer);
    data.map((result) => {
      const resultsTemplate = document.querySelector("#result__template");
      const resultsGenerator = resultsTemplate.content.cloneNode(true);
      const card = resultsGenerator.querySelector(".result__card");
      const avatar = resultsGenerator.querySelector(".result__card-img");
      const name = resultsGenerator.querySelector(".result__card-name");
      const link = resultsGenerator.querySelector(".result__card-link");
      const title = resultsGenerator.querySelectorAll(".result__card-title");
      const value = resultsGenerator.querySelectorAll(".result__card-value");
      avatar.src = result.avatar;
      name.textContent = result.name;
      link.href = result.link;
      let i = 0;
      for (let key in result.info) {
        if (result.info[key]) {
          title[i].textContent = key;
          value[i].textContent = result.info[key];
          i++;
        }
      }
      this.resultsContainer.append(card);
    });
  }

  clear(parent) {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  }

  renderLoader() {
    this.clear(this.resultsContainer);
    const loaderTemplate = document.querySelector("#loader");
    const loaderGenerator = loaderTemplate.content.cloneNode(true);
    this.resultsContainer.append(loaderGenerator);
  }

  renderError(status) {
    const errorTemplate = document.querySelector("#error");
    const errorGenerator = errorTemplate.content.cloneNode(true);
    const title = errorGenerator.querySelector(".error__title");
    const note = errorGenerator.querySelector(".error__note");
    const errorContentArray = this.defineErrorStatus(status);
    title.textContent = errorContentArray[0];
    note.textContent = errorContentArray[1];
    this.clear(this.resultsContainer);
    this.resultsContainer.append(errorGenerator);
    document.body.classList.add("freezed");
    document
      .querySelector(".error__btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(".results").classList.add("hidden");
        document.body.classList.remove("freezed");
      });
  }

  defineErrorStatus(status) {
    switch (status) {
      case 422:
        return ["Your input is incorrect", "please enter a valid input"];
      case 403:
        return ["Request limit reached", "please wait a minute and try again"];
      case "empty response":
        return [
          "Nothing found for your request",
          "please try again with another input",
        ];
    }
  }
}

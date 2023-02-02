const API_URL = "https://api.github.com/search/users?q=mrborker&page=1";
const API_URL2 = "https://api.github.com/search/repositories?q=todo&page=1";
// const user = fetch(url).then((response) =>
//   response.json().then((result) => console.log(result))
// );

const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const { items } = await getJSON(API_URL2);

console.log(items);

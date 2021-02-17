import {
  clearData,
  shopCardCreator,
  removeData,
  showSearchLoader,
  formLoader,
  hideFormLoader,
} from "./main.js";

function showDataFetch(url) {
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      clearData();
      data.forEach((element) => shopCardCreator(element));
      var showSearcher = document.getElementById("hideSearcherContainer");
      showSearcher.classList.add("displayContent");
    })
    .catch(function () {
      clearData();
      var temp = document.getElementsByTagName("template")[1];
      var clon = temp.content.cloneNode(true);
      dataContainer.appendChild(clon);
    });
}

function searchShopFetch(url) {
  showSearchLoader();
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      removeData(data);
    })
    .catch(function () {
      removeData();
      var temp = document.getElementsByTagName("template")[2];
      var clon = temp.content.cloneNode(true);
      dataContainer.appendChild(clon);
    });
}

function setShopFetch(shopToJson, url) {
  formLoader();
  fetch(url, {
    method: "POST", // or 'PUT'
    body: shopToJson, // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function () {
      hideFormLoader();
      clearData();
      showDataFetch(url);
    })
    .catch(function () {
      hideFormLoader();
      clearData();
      var temp = document.getElementsByTagName("template")[1];
      var clon = temp.content.cloneNode(true);
      dataContainer.appendChild(clon);
    });
}

export { showDataFetch, setShopFetch, searchShopFetch };

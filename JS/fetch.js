import {
  clearData,
  shopCardCreator,
  removeData,
  showSearchLoader,
  formLoader,
  hideFormLoader,
} from "./main.js";

import { failServer, failSearch } from "./typeRequest.js";

/**
 * Mostramos las tiendas con el servicio Fetch
 * @param {*} url dirección url del que se consume el servicio
 */
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
      failServer();
    });
}

/**
 * Buscamos la tienda introducida por teclado con el servicio Fetch
 * @param {*} url dirección url del que se consume el servicio
 */
function searchShopFetch(url) {
  showSearchLoader();
  fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      removeData(data);
    })
    .catch(function () {
      failSearch();
    });
}

/**
 * Creamos la tienda introducida por teclado con el servicio Fetch
 * @param {*} shopToJson datos de la tienda a introducir
 * @param {*} url dirección url del que se consume el servicio
 */
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
      failServer();
    });
}

export { showDataFetch, setShopFetch, searchShopFetch };

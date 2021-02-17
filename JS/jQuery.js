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
 * Mostramos las tiendas con el servicio jQuery
 * @param {*} urls dirección url del que se consume el servicio
 */
function showDataJQuery(urls) {
  $.ajax({
    url: urls,
    method: "GET",
    dataType: "json",
  })
    .done(function (data) {
      clearData();
      data.forEach((element) => shopCardCreator(element));
      var showSearcher = document.getElementById("hideSearcherContainer");
      showSearcher.classList.add("displayContent");
    })
    .fail(function () {
      failServer();
    });
}
/**
 * Buscamos la tienda introducida por teclado con el servicio Fetch
 * @param {*} urls dirección url del que se consume el servicio
 */
function searchShopJquery(urls) {
  $.ajax({
    url: urls,
    method: "GET",
    dataType: "json",
    beforeSend: showSearchLoader(),
  })
    .done(function (data) {
      if (data != null) {
        clearData();
        removeData(data);
      } else {
        failSearch();
      }
    })
    .fail(function () {
      failSearch();
    });
}

/**
 * Creamos la tienda introducida por teclado con el servicio jQuery
 * @param {*} shopToJson datos de la tienda a introducir
 * @param {*} urls dirección url del que se consume el servicio
 */
function setShopJQuery(shopToJson, urls) {
  $.ajax({
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    type: "POST",
    url: urls,
    data: shopToJson,
    dataType: "json",
    beforeSend: formLoader(),
  })
    .done(function () {
      hideFormLoader();
      clearData();
      showDataJQuery(urls);
    })
    .fail(function () {
      hideFormLoader();
      failServer();
    });
}

export { showDataJQuery, searchShopJquery, setShopJQuery };

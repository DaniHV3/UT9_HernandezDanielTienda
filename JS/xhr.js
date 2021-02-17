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
 * Mostramos las tiendas con el servicio XHR
 * @param {*} url dirección url del que se consume el servicio
 */
function showDataXhr(url) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      try {
        var totalShops = JSON.parse(this.responseText);
        clearData();
        totalShops.forEach((element) => shopCardCreator(element));
        var showSearcher = document.getElementById("hideSearcherContainer");
        showSearcher.classList.add("displayContent");
      } catch {
        failServer();
      }
    } else {
      if (this.readyState == 4 && this.status == 0) {
        failServer();
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/**
 * Buscamos la tienda introducida por teclado con el servicio XHR
 * @param {*} url dirección url del que se consume el servicio
 */
function searchShopXhr(url) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      try {
        var totalShops = JSON.parse(this.responseText);
        clearData();
        removeData(totalShops);
      } catch {
        failSearch();
      }
    } else {
      if (
        this.readyState >= 4 &&
        (this.status == 0 || this.status == 204 || this.status == 404)
      ) {
        failSearch();
      } else {
        showSearchLoader();
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/**
 * Creamos la tienda introducida por teclado con el servicio XHR
 * @param {*} shopToJson datos de la tienda a introducir
 * @param {*} url dirección url del que se consume el servicio
 */
function setShopXhr(shopToJson, url) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && (this.status == 204 || this.status == 200)) {
      hideFormLoader();
      clearData();
      showDataXhr(url);
    } else {
      if (this.readyState == 4 && this.status == 0) {
        hideFormLoader();
        failServer();
      } else {
        formLoader();
      }
    }
  };

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(shopToJson);
}

export { showDataXhr, searchShopXhr, setShopXhr };

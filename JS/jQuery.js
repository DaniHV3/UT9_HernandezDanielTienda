import {
  clearData,
  shopCardCreator,
  removeData,
  showSearchLoader,
  formLoader,
  hideFormLoader,
} from "./main.js";
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
      clearData();
      var temp = document.getElementsByTagName("template")[1];
      var clon = temp.content.cloneNode(true);
      dataContainer.appendChild(clon);
    });
}

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
        removeData();
        var temp = document.getElementsByTagName("template")[2];
        var clon = temp.content.cloneNode(true);
        dataContainer.appendChild(clon);
      }
    })
    .fail(function () {
      removeData();
      var temp = document.getElementsByTagName("template")[2];
      var clon = temp.content.cloneNode(true);
      dataContainer.appendChild(clon);
    });
}

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
      clearData();
      var temp = document.getElementsByTagName("template")[1];
      var clon = temp.content.cloneNode(true);
      dataContainer.appendChild(clon);
    });
}

export { showDataJQuery, searchShopJquery, setShopJQuery };

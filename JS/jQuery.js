import { clearData, shopCardCreator, removeData } from "./main.js";
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
  })
    .done(function (data) {
      clearData();
      data.forEach((element) => removeData(element));
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
    type: "POST",
    url: urls,
    data: shopToJson,
    dataType: "json",
  })
    .done(function () {
      clearData();
      showDataJQuery(urls);
    })
    .fail(function () {
      clearData();
      var temp = document.getElementsByTagName("template")[1];
      var clon = temp.content.cloneNode(true);
      dataContainer.appendChild(clon);
    });
}

export { showDataJQuery, searchShopJquery, setShopJQuery };

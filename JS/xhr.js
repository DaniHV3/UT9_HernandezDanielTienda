import { clearData, shopCardCreator, removeData } from "./main.js";
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
        clearData();
        var temp = document.getElementsByTagName("template")[1];
        var clon = temp.content.cloneNode(true);
        dataContainer.appendChild(clon);
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function searchShopXhr(url) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      try {
        var totalShops = JSON.parse(this.responseText);
        clearData();
        totalShops.forEach((element) => removeData(element));
      } catch {
        removeData();
        var temp = document.getElementsByTagName("template")[2];
        var clon = temp.content.cloneNode(true);
        dataContainer.appendChild(clon);
      }
    } else {
      if (this.readyState == 4 && this.status == 0) {
        removeData();
        var temp = document.getElementsByTagName("template")[2];
        var clon = temp.content.cloneNode(true);
        dataContainer.appendChild(clon);
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function setShopXhr(shopToJson, url) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      clearData();
      showDataXhr(url);
    } else {
      if (this.readyState == 4 && this.status == 0) {
        clearData();
        var temp = document.getElementsByTagName("template")[1];
        var clon = temp.content.cloneNode(true);
        dataContainer.appendChild(clon);
      }
    }
  };

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(shopToJson);
}

export { showDataXhr, searchShopXhr, setShopXhr };

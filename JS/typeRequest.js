import { clearData, removeData } from "./main.js";
/**
 * Mostramos un mensaje si hay un fallo de servidor
 */
function failServer() {
  clearData();
  var temp = document.getElementsByTagName("template")[1];
  var clon = temp.content.cloneNode(true);
  dataContainer.appendChild(clon);
}

/**
 * Mostramos un mensaje si hay un error al buscar una tienda
 */
function failSearch() {
  removeData();
  var temp = document.getElementsByTagName("template")[2];
  var clon = temp.content.cloneNode(true);
  dataContainer.appendChild(clon);
}

export { failSearch, failServer };

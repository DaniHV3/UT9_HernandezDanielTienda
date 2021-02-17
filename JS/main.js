import { datos } from "./dataForm.js";
import { showDataFetch, setShopFetch, searchShopFetch } from "./fetch.js";
import { showDataJQuery, searchShopJquery, setShopJQuery } from "./jQuery.js";
import { showDataXhr, searchShopXhr, setShopXhr } from "./xhr.js";

var dataContainer = document.getElementById("dataContainer");
var searcher = document.getElementById("searchIcon");
var newShopDisplay = document.getElementById("newShopForm");
var formContainer = document.getElementById("formContainer");
var generalContainer = document.getElementById("generalContainer");
var formButton = document.getElementById("sendButton");

var comprobadorMostrar = true;
var foldChecker = true;
//const url ="http://localhost:8080/EmprInfRs_HernandezDaniel/webresources/tienda/";
const url =
  "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/";
var nameOption;
optionsEvents();
fieldProperties();
hideGeneralContainer();
hideForm();

searcher.addEventListener("click", showSearchData);
newShopDisplay.addEventListener("click", displayForm);
formButton.addEventListener("click", saveDataForm);

//-------------------------------------------------- START MENU --------------------------------------------------
/**
 * Añadimos los eventos a los botones de elección de servicio
 */
function optionsEvents() {
  var XHR = document.getElementById("XHRoption");
  var fetch = document.getElementById("Fetchoption");
  var jQuery = document.getElementById("jQueryoption");
  XHR.addEventListener("click", optionSelected);
  fetch.addEventListener("click", optionSelected);
  jQuery.addEventListener("click", optionSelected);
}

/**
 * Una vez seleccionamos una opción de servicio, ocultamos su menú
 * @param {*} option opción de servicio elegida
 */
function optionSelected(option) {
  generalContainer.classList.remove("hide");
  var selectContainer = document.getElementById("fatherContSelect");
  selectContainer.classList.add("hide");
  nameOption = option.target.name;
  showShops();
}

/**
 * Ocultamos el container general
 */
function hideGeneralContainer() {
  generalContainer.classList.add("hide");
}

/**
 * Mostramos todas las tiendas iniciales con el servicio elegido
 */
function showShops() {
  if (nameOption == "xhr") {
    showDataXhr(url);
    errorChecker();
  } else if (nameOption == "fetch") {
    showDataFetch(url);
    errorChecker();
  } else if (nameOption == "jquery") {
    showDataJQuery(url);
    errorChecker();
  }
}
/**
 * Recogemos el valor introducido y se lo pasamos al servicio seleccionado
 */
function showSearchData() {
  var id = document.getElementById("shopId");
  var finalUrl = url + id.value;
  if (id.value == "") {
    finalUrl = url + "x";
  }
  if (nameOption == "xhr") {
    searchShopXhr(finalUrl);
  } else if (nameOption == "fetch") {
    searchShopFetch(finalUrl);
  } else if (nameOption == "jquery") {
    searchShopJquery(finalUrl);
  }
}
/**
 * Comprobamos si se han mostrado las tiendas para mostrar o no el buscador
 */
function errorChecker() {
  if (dataContainer.childNodes.length >= 2) {
    var showSearcher = document.getElementById("searcherContainer");
    showSearcher.classList.add("displayContent");
  }
}

/**
 * Creamos la ficha de la tienda apartir de sus datos
 * @param {*} data datos de la tienda
 */
function shopCardCreator(data) {
  var temp = document.getElementsByTagName("template")[0];
  var clon = temp.content.cloneNode(true);

  var nameShop = document.createTextNode(data.nombreTienda);
  var directionShop = document.createTextNode(data.direccion);
  var phoneNumberShop = document.createTextNode(data.telefono);
  var locationShop = document.createTextNode(data.localidad);
  var locationAndDirection = document.createTextNode(
    `${directionShop.data}(${locationShop.data})`
  );
  clon.childNodes[1].childNodes[1].appendChild(nameShop);
  clon.childNodes[1].childNodes[3].appendChild(locationAndDirection);
  clon.childNodes[1].childNodes[5].appendChild(phoneNumberShop);

  dataContainer.appendChild(clon);
}

//-------------------------------------------------- ADD EVENTS --------------------------------------------------
/**
 * Le damos una propiedad a cada campo del formulario
 */
function fieldProperties() {
  var elementosForm = document.forms[0];
  for (let i = 0; i < elementosForm.elements.length; i++) {
    elementosForm.elements[i].addEventListener("keyup", fieldChecker);
  }
}

//-------------------------------------------------- FORM --------------------------------------------------
/**
 * Desplegamos o Plegamos el formulario
 */
function displayForm() {
  if (foldChecker) {
    formContainer.classList.remove("hide");
    formContainer.classList.remove("foldForm");
    formContainer.classList.add("displayForm");
    foldChecker = false;
  } else {
    formContainer.classList.remove("displayForm");
    formContainer.classList.add("foldForm");
    setTimeout(function () {
      formContainer.classList.add("hide");
    }, 1500);

    foldChecker = true;
  }
}
/**
 * Ocultamos el formulario al principio del programa
 */
function hideForm() {
  formContainer.classList.add("hide");
}
//-------------------------------------------------- LOADER --------------------------------------------------
/**
 * Deshabilitamos el botón de envio de formulario y mostramos el icono de refresco
 */
function formLoader() {
  var setButton = document.getElementById("sendButton");
  var refreshSearch = document.getElementById("refreshSearchForm");
  refreshSearch.classList.add("displayContent");
  setButton.disabled = true;
}

/**
 * Habilitamos el botón una vez se haya finalizado la petición de creación de tienda
 */
function hideFormLoader() {
  var setButton = document.getElementById("sendButton");
  var refreshSearch = document.getElementById("refreshSearchForm");
  refreshSearch.classList.remove("displayContent");
  setButton.disabled = false;
}

/**
 * Ocultamos la lupa y mostramos el icono de refresco
 */
function showSearchLoader() {
  var lensIcon = document.getElementById("lensIcon");
  var refreshSearch = document.getElementById("refreshSearch");
  if (lensIcon != null && refreshSearch != null) {
    lensIcon.classList.add("hide");
    refreshSearch.classList.add("displayContent");
  }
}

//-------------------------------------------------- SEND DATA --------------------------------------------------

/**
 * Comprobamos los datos del formulario que estén en su formato correcto
 */
function saveDataForm() {
  var checker = true;
  var requirements = rulesSearcher(fieldName);
  var formElements = document.forms[0];
  for (var acct = 0; acct < formElements.elements.length; acct++) {
    var fieldName = formElements.elements[acct].name;
    var requirements = rulesSearcher(fieldName);

    if (!formElements.elements[acct].validity.valueMissing) {
      if (formElements.elements[acct].name == "telefono") {
        if (!formElements.elements[acct].validity.patternMismatch) {
          //Comprobamos si se cumple su expresión regular
          if (!formElements.elements[acct].validity.valueMissing) {
            fieldCorrect(formElements.elements[acct]);
          } else {
            fieldIncorrect(
              formElements.elements[acct],
              requirements.errorMessage
            );
            checker = false;
          }
        } else {
          fieldIncorrect(
            formElements.elements[acct],
            requirements.errorMessage
          );
          checker = false;
        }
      } else {
        fieldCorrect(formElements.elements[acct]);
      }
    } else {
      fieldIncorrect(formElements.elements[acct], "Campo obligatorio");
      checker = false;
    }
  }
  if (checker) {
    saveShop();
  }
}

/**
 * Guardamos los datos de la tienda
 */
function saveShop() {
  var formElements = document.forms[0];
  formElements = formElements.elements;
  let nombre = formElements[0].value;
  let direccion = formElements[1].value;
  let localidad = formElements[2].value;
  let telefono = formElements[3].value;
  var shop = new Shop(nombre, direccion, localidad, telefono);
  var shopToJson = JSON.stringify(shop);
  clearInputs();

  if (nameOption == "xhr") {
    setShopXhr(shopToJson, url);
  } else if (nameOption == "fetch") {
    setShopFetch(shopToJson, url);
  } else if (nameOption == "jquery") {
    setShopJQuery(shopToJson, url);
  }
}

//-------------------------------------------------- CLEAR/REMOVE ITEMS --------------------------------------------------
/**
 * Limpiamos el almacen donde se muestran las tiendas
 */
function clearData() {
  //Eliminamos todo el contenedor
  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }
}
/**
 * Limpiamos los inputs una vez se haya enviado correctamente el formulario
 */
function clearInputs() {
  var formElements = document.forms[0];
  formElements = formElements.elements;
  for (var acct = 0; acct < formElements.length; acct++) {
    formElements[acct].value = "";
  }
}
/**
 * Escondemos el icono de refresco una vez se haya realizado la petición
 */
function removeLoader() {
  var loader = document.getElementById("refreshIcon");
  loader.classList.add("hide");
}

/**
 * Cambiamos el icono de el botón de buscar y borramos el contenedor
 * @param {*} element Elemento a añadir
 */
function removeData(element) {
  if (comprobadorMostrar) {
    //Eliminamos los datos anteriores y mostramos la nueva tienda
    clearData();
    if (element != undefined) {
      shopCardCreator(element);
    }
    searcher.innerText = "x";
    comprobadorMostrar = false;
  } else {
    clearData();
    showShops();
    searcher.innerText = "";
    var temp = document.getElementsByTagName("template")[3];
    var clon = temp.content.cloneNode(true);
    searcher.appendChild(clon);
    searcher.addEventListener("click", showSearchData);
    comprobadorMostrar = true;
  }
}

//-------------------------------------------------- FORM --------------------------------------------------

/**
 * Comprobamos si el contenido de ese campo está en el formato correcto
 * @param {*} field campo que se está comprobando
 */
function fieldChecker(field) {
  var fieldName = field.target.name;
  var requirements = rulesSearcher(fieldName);
  //Comprobamos si se cumple su expresión regular
  if (!field.target.validity.valueMissing) {
    if (fieldName == "telefono") {
      if (!field.target.validity.patternMismatch) {
        fieldCorrect(field.target);
        return true;
      } else {
        fieldIncorrect(field.target, requirements.errorMessage);
        return false;
      }
    } else {
      fieldCorrect(field.target);
      return true;
    }
  } else {
    fieldIncorrect(field.target, requirements.errorMessage);
    return false;
  }
}

/**
 * Buscamos las reglas de cada campo
 * @param {*} field campo que se está comprobando
 */
function rulesSearcher(field) {
  var requisitosCorrectos;
  datos.campos.forEach((dato) => {
    if (field == dato.name) {
      requisitosCorrectos = dato;
    }
  });
  return requisitosCorrectos;
}

/**
 * Marcamos el cuadro en verde del elemento que llama a esta función y eliminamos su error si lo hubiera
 * @param {*} field campo del que se llama a la función
 * @param {*} fieldFather campo padre del elemento que llama a la función
 */
function fieldCorrect(field) {
  field.classList.remove("errorField");
  field.classList.add("correctField");
  field.nextSibling.nextSibling.innerText = ""; //Vaciamos su campo de error
}

/**
 * Marcamos el cuadro en rojo del elemento que llama a esta función y añadimos su mensaje de error correspondiente
 * @param {*} field campo del que se llama a la función
 * @param {*} fieldFather campo padre del elemento que llama a la función
 * @param {*} errorMessage mensaje de error correspondiente del campo que llama a la función
 */
function fieldIncorrect(field, errorMessage) {
  field.classList.remove("correctField");
  field.classList.add("errorField");

  //Comprobamos is el error es por un campo vacío, si lo es le atribuimos un mensaje en concreto, si no, le damos el error de su expresión
  if (field.name == "telefono") {
    if (!field.validity.valueMissing) {
      field.nextSibling.nextSibling.innerText = errorMessage;
    } else {
      field.nextSibling.nextSibling.innerText = "Campo obligatorio";
    }
  } else {
    field.nextSibling.nextSibling.innerText = "Campo obligatorio";
  }
}

class Shop {
  constructor(nombre, direccion, localidad, telefono) {
    this.nombreTienda = nombre;
    this.direccion = direccion;
    this.localidad = localidad;
    this.telefono = telefono;
  }
}
export {
  clearData,
  shopCardCreator,
  removeData,
  removeLoader,
  showSearchLoader,
  formLoader,
  hideFormLoader,
};

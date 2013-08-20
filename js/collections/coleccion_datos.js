// COLLECTIONS
// ======

/**
* Maneja coleccion con elementos de temas que contiene un titulo y una colecciones de items
*/
App.collections.ColeccionDatosEdEscolar = Backbone.Collection.extend({
	url : "data/json_datamineduc_corrgido.js?v1"
})
/**
* Maneja coleccion con elementos de temas que contiene un titulo y una colecciones de items
*/
 App.collections.ColeccionDatosEdSuperior = Backbone.Collection.extend({
 	url : "data/catalogo_datosEdSuperior3.js?v1"
 })
/**
* Maneja coleccion con elementos de temas que contiene un titulo y una colecciones de items
*/
  App.collections.ColeccionDatosEdParvularia = Backbone.Collection.extend({
 	url : "data/catalogo_datosEdParvularia3.js?v1"
 })
/**
* Maneja coleccion con elementos d datos que incluyen un titulo y un conjunto de datos que incluye nombre, url, thumbnails
*/
  App.collections.ColeccionVisualizadores = Backbone.Collection.extend({
 	url : "data/catalogo_visualizadores.js?v1"
 })


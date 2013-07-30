// COLLECTIONS
// ======

/**
* Maneja coleccion con elementos d datos que incluyen un título, descripción y lista de links
*/
App.collections.ColeccionDatosEdEscolar = Backbone.Collection.extend({
	url : "data/catalogo_datosEdEscolar.js?v1"
})

 App.collections.ColeccionDatosEdSuperior = Backbone.Collection.extend({
 	url : "data/catalogo_datosEdSuperior.js?v1"
 })

  App.collections.ColeccionDatosEdParvularia = Backbone.Collection.extend({
 	url : "data/catalogo_datosEdParvularia.js?v1"
 })

  App.collections.ColeccionVisualizadores = Backbone.Collection.extend({
 	url : "data/catalogo_visualizadores.js?v1"
 })


/**
* @namespace 
* @property {object} collections - Colecciones de entidades (Clases e instancias).	
* @property {object} models - Modelos
* @property {object} views - Vistas
* @property {object} views.dataMineducAppView - Controlador proncipal de las vistas y datos.	
* @property {object} views.MenuSeccionesView - Manejador de vista de las seccione(vatalogo de datos y catalogo de visualizadores)	
* @property {object} views.SideBarView - Menejador de Vista Sidebar ( menu)	
* @property {object} router - Manejador de rutas - urls.	

*/
window.App = {
	models : {},
	collections : {},
	views : {}
}
 /**
    * Funciones globales
    */
App.utils = {
   /**
    * Crear SLUG para generar los ID de los elementos del SIDEBAR y los titulos de los elementos de los catalogos
    */
  make_slug:function(str){
  		console.log(str);
	    str = str.toLowerCase();
	    str = str.replace(/[^a-z0-9]+/g, '-');
	    str = str.replace(/^-|-$/g, '');
	    return str;
	},
	getTabActual:function(){
		return $("#tabs").find("li.active").children().text();
	}

};


$().ready(function() {

	/**LINK DESCARGAS*/
	$('.maincontent').on('click', 'a.download', function() {

			var tabActual = App.utils.getTabActual();
			var tipo = $(this).attr("class").split(" ")[0]
			var tr_Seleccionado = $(this).parent().parent().parent().parent();
			var anio =  tr_Seleccionado.children().eq(0).html();
			var titulo = tr_Seleccionado.parent().parent().parent().parent().children().first("div").find("h3").text();
			var tema = tr_Seleccionado.parent().parent().parent().parent().parent().find("h2").text();
			var path = "/Descarga/CatalogoDatos"+"/"+tabActual+"/"+tema+"/"+titulo+"/"+anio+"/"+tipo
			
			_gaq.push(["_trackPageview", path]);

			
	});

	$('.maincontent').on('click', '.viz', function() {

		//console.log("/url/CatalogoVisualizadores/");
		var tema = $(this).parent().parent().parent().find("h3").text();
		var nombre = $(this).text();
		var path = "/url/CatalogoVisualizadores/"+tema+"/"+nombre
		console.log("/url/CatalogoVisualizadores/"+tema+"/"+nombre)

		_gaq.push(["_trackPageview", path]);
			
	});
	/**IDENTIFICAR EL TABS */
	$('.maincontent').on('click', '.nav-tabs', function(e) {
  			console.log( App.utils.make_slug(e.target.text));
			_gaq.push(['_trackPageview',  "/CatalogoDatos/"+App.utils.make_slug(e.target.text)]);
			console.log("/CatalogoDatos/"+App.utils.make_slug(e.target.text))
	});

	// $('#tabs a').click(function (e) {
		
 //  		e.preventDefault()
 //  		$(this).tab('show')
	// })
	
	/**
	*  Inicializar las colecciones de datos ( json interno)
	*/
	App.collections.coleccionDatosEdEscolar   = new App.collections.ColeccionDatosEdEscolar();
	App.collections.coleccionDatosEdSuperior  = new App.collections.ColeccionDatosEdSuperior();
	App.collections.coleccionDatosEdParvularia = new App.collections.ColeccionDatosEdParvularia();
	App.collections.coleccionVisualizadores    = new App.collections.ColeccionVisualizadores();
	/**
	*   Vista Principal
	*/
	App.views.dataMineducAppView = new App.views.DataMineducAppView();
	$(".maincontent").html(App.views.dataMineducAppView.$el);
	/**
	*  Obtener las colecciones de datos ( json interno)
	*/
	App.collections.coleccionDatosEdEscolar.fetch();
	App.collections.coleccionDatosEdSuperior.fetch();
	App.collections.coleccionDatosEdParvularia.fetch();
	App.collections.coleccionVisualizadores.fetch();



	App.router = new App.Router()
	Backbone.history.start();
	


});

App.views.DataMineducAppView = Backbone.View.extend(
/** @lends MainView.prototype */
{
	/** DIV -  elemento generado por esta vista */
	tagName: "div",

	/**
	* @class MainView vista principal, se encarga de los datos y la gestion de eventos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.	
	* @property {String} this.quizSession - Modelo con datos de la sesión de preguntas .	
	* 
	* MainView genera el template respectivo
	*/
	initialize : function() {
		/** Template Vista Principal */
		this.template = _.template($("#template_MainView").html());
		/**Inicializar el menu de secciones*/
		App.views.menuSeccionesView = new App.views.MenuSeccionesView();

		App.views.catalogoDatosListViewEdEscolar  = new App.views.CatalogoDatosMainView({collection:App.collections.coleccionDatosEdEscolar,tab:1});
		App.views.catalogoDatosListViewEdSuperior = new App.views.CatalogoDatosMainView({collection:App.collections.coleccionDatosEdSuperior,tab:2});
		App.views.catalogoDatosListViewEdParvularia = new App.views.CatalogoDatosMainView({collection:App.collections.coleccionDatosEdParvularia,tab:3});
		App.views.catalogoVisualizadoresMainView = new App.views.CatalogoVisualizadoresMainView({collection:App.collections.coleccionVisualizadores});
    	/**Escucha los eventos del menu secciones*/
    	this.listenTo(App.views.menuSeccionesView, "catalogo:selectDatos", this.showCatalogoDatos);
		this.listenTo(App.views.menuSeccionesView, "catalogo:selectVisualizadores", this.showCatalogoVisualizadores);

		this.render();

	},
	
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render : function() {
		this.$el.html(this.template());
		this.$el.find("div.menu.secciones").html(App.views.menuSeccionesView.$el);
		this.$el.find("div.subseccion.educacion_escolar").html(App.views.catalogoDatosListViewEdEscolar.$el);
		this.$el.find("div.subseccion.educacion_superior").html(App.views.catalogoDatosListViewEdSuperior.$el);
		this.$el.find("div.subseccion.educacion_parvularia").html(App.views.catalogoDatosListViewEdParvularia.$el);
		this.$el.find("div.subseccion.visualizadores").html(App.views.catalogoVisualizadoresMainView.$el);
		/**ocultar el catalogo de visualizadores*/
		this.$el.find(".catalogo_visualizadores").hide()
		return this;
	},
	/**
	* Muestra el catalogo de datos, ocultar el catalogo de visualizadores
	*/
	showCatalogoDatos : function() {
		console.log("showCatalogoDatos");
		this.$el.find(".seccion.catalogo_datos").show()
		this.$el.find(".seccion.catalogo_visualizadores").hide()
		App.views.menuSeccionesView.setDatos();
	},
	/**
	* Muestra el catalogo de visualizadores y oculta el catalogo de datos
	*/
	showCatalogoVisualizadores : function() {
		console.log("showCatalogoVisualizadores");
		this.$el.find(".seccion.catalogo_datos").hide()
		this.$el.find(".seccion.catalogo_visualizadores").show()
		App.views.menuSeccionesView.setVisualizadores();
	}


});



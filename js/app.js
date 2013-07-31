/**
* @namespace 
* @property {object} collections - Colecciones de entidades (Clases e instancias).	
* @property {object} models - Colecciones de entidades (Clases e instancias).	
* @property {object} views - Colecciones de entidades (Clases e instancias).	
* @property {object} views.mainView - Controlador proncipal de las vistas y datos.	
* @property {object} views.MenuSeccionesView - Manejador de vista de las seccione(vatalogo de datos y catalogo de visualizadores)	
* @property {object} views.SideBarView - Menejador de Vista Sidebar ( menu)	
* @property {object} router - Manejador de rutas - urls.	

*/
window.App = {
	models : {},
	collections : {},
	views : {}
}


$().ready(function() {

	console.log("ready");
	App.collections.coleccionDatosEdEscolar = new App.collections.ColeccionDatosEdEscolar();
	App.collections.coleccionDatosEdEscolar.fetch();

	App.collections.coleccionDatosEdSuperior = new App.collections.ColeccionDatosEdSuperior();
	App.collections.coleccionDatosEdSuperior.fetch();

	App.collections.coleccionDatosEdParvularia = new App.collections.ColeccionDatosEdParvularia();
	App.collections.coleccionDatosEdParvularia.fetch();

	App.collections.coleccionVisualizadores = new App.collections.ColeccionVisualizadores();
	App.collections.coleccionVisualizadores.fetch();

	App.views.mainView = new App.views.MainView();
	$(".maincontent").html(App.views.mainView.render().$el);

	App.router = new App.Router()
	Backbone.history.start();


	//$('#tabs').tab();//activacion de los TAB (Ed. Escolar,Ed. Superior,Ed. Parvularia)
	//$(".catalogo_visualizadores").hide() //ocultar el catalogo de visualizadores

	//App.views.mainView.hideCatalogoVisualizadores();
	


});

App.views.MainView = Backbone.View.extend(
/** @lends MainView.prototype */
{
	/** DIV -  elemento generado por esta vista */
	tagName: "div",
	
	/**
	* @class MainView Controla datos y vistas relacionadas con los catalogos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.	
	* @property {String} this.quizSession - Modelo con datos de la sesión de preguntas .	
	* 
	* MainView genera el template respectivo
	*/
	initialize : function() {
		console.log("App.views.MainView");
		this.template = _.template($("#template_MainView").html());

		App.views.menuSeccionesView = new App.views.MenuSeccionesView();

		//App.views.CatalogoDatosMainView = new App.views.CatalogoDatosMainView();
		 App.views.catalogoDatosListViewEdEscolar = new App.views.CatalogoDatosListView({collection:App.collections.coleccionDatosEdEscolar});
		 App.views.catalogoDatosListViewEdSuperior = new App.views.CatalogoDatosListView({collection:App.collections.coleccionDatosEdSuperior});
		 App.views.catalogoDatosListViewEdParvularia = new App.views.CatalogoDatosListView({collection:App.collections.coleccionDatosEdParvularia});
		 App.views.catalogoVisualizadoresListView = new App.views.CatalogoVisualizadoresListView({collection:App.collections.coleccionVisualizadores});

		 this.listenTo(App.views.menuSeccionesView, "catalogo:selectDatos", this.showCatalogoDatos);
		 this.listenTo(App.views.menuSeccionesView, "catalogo:selectVisualizadores", this.showCatalogoVisualizadores);
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
		this.$el.find("div.subseccion.visualizadores").html(App.views.catalogoVisualizadoresListView.$el);

		this.$el.find(".catalogo_visualizadores").hide() //ocultar el catalogo de visualizadores
		return this;
	},
	/**
	* Muestra el catalogo de datos, ocultar el catalogo de visualizadores
	*/
	showCatalogoDatos : function() {
		this.$el.find(".seccion.catalogo_datos").show()
		this.$el.find(".seccion.catalogo_visualizadores").hide()
		App.views.menuSeccionesView.setDatos();
	},
	/**
	* Muestra el catalogo de visualizadores y oculta el catalogo de datos
	*/
	showCatalogoVisualizadores : function() {
		this.$el.find(".seccion.catalogo_datos").hide()
		this.$el.find(".seccion.catalogo_visualizadores").show()
		App.views.menuSeccionesView.setVisualizadores();
	}


});


/**
* Maneja contenido de menu de secciones
*/
App.views.MenuSeccionesView = Backbone.View.extend({
	initialize : function() {
		this.template = _.template($("#template_menu_secciones").html())

		this.render()
	},
	events: {
		"click a.btnCatalogo": "selectCatalogo"
		
	},
	selectCatalogo:function(e){
		var opcion  = $(e.target).attr("id");
		if	(opcion == "catalogoDatos") {
			this.trigger("catalogo:selectDatos");
			this.setDatos();
		}else{

			this.trigger("catalogo:selectVisualizadores");
			this.setVisualizadores();
		}
	},

	render: function() {
		this.$el.html(this.template());

		return this;
	},

	setDatos : function() {
		$("#catalogoDatos").addClass("btn-primary");
		$("#catalogoVisualizadores").addClass("btn-default");
		$("#catalogoVisualizadores").removeClass("btn-primary");

		

	},

	setVisualizadores : function() {
		$("#catalogoDatos").removeClass("btn-primary");
		$("#catalogoDatos").addClass("btn-default");
	    $("#catalogoVisualizadores").addClass("btn-primary");

	}

})

// VISTAS
// ======
/**
* Maneja contenido del SIDEDAR
*/
App.views.SideBarView = Backbone.View.extend({
	
	initialize : function() {
		console.log("SideBarView");
		this.template = _.template($("#template_SideBarView").html())
		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);

		this.render()
	},
	
	render: function() {
		
		this.$el.html(this.template());
		var $list = this.$el.find(".bs-sidenav");

		this.collection.each(function(item) {
			var itemView = new App.views.SideBarItemView({model: item});
			$list.append(itemView.render().$el);
		})

		return this;
	}

})

App.views.SideBarItemView = Backbone.View.extend({
	tagName :"li",

	initialize : function() {
		console.log("SideBarItemView");
	
		this.template = _.template($("#template_SideBarItemView").html())
		this.render()
	},
	events:{
		"click a.active": "activarLi"
	},

	activarLi:function(e){
		alert("LI");
	},

	render: function() {
		var data = this.model.toJSON();

		this.$el.html(this.template(data));

		var $list = this.$el.find(".bs-sidenav");

		return this;
}

})

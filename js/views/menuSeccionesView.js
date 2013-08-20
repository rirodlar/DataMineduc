/**
* Maneja contenido de menu de secciones
*/
App.views.MenuSeccionesView = Backbone.View.extend(
/** @lends MenuSeccionesView.prototype */
{
	/**
	* @class MenuSeccionesView Controla datos y vistas relacionadas con los 2 catalogos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.		* 
	* MenuSeccionesView genera el template respectivo
	*/
	initialize : function() {
		console.log("initialize::MenuSeccionesView")
		this.template = _.template($("#template_menu_secciones").html())

		this.render()
	},
	/**
	*	Se geenra un evento al clickear sobre los botones del catalogo
	*/
	events: {
		"click a.btnCatalogo": "selectCatalogo"
		
	},
	selectCatalogo:function(e){
		var opcion  = $(e.target).attr("id");
		console.log("opcion :"+opcion)
		if	(opcion == "catalogoDatos") {
			/**
			 * Evento selectDatos
			 * @event MenuSeccionesView#selectDatos
			 */
			this.trigger("catalogo:selectDatos");
			this.setDatos();
			 console.log("/catalogo_Datos/")
		}else{
			/**
			 * Evento selectVisualizadores
			 * @event MenuSeccionesView#selectVisualizadores
			 */
			this.trigger("catalogo:selectVisualizadores");
			this.setVisualizadores();
			 // _gaq.push(['_setAccount', 'UA-42890251-1']);
		   //  _gaq.push(["_trackPageview", "/catalogo_vizualizadores/"]);
		     console.log("/catalogo_vizualizadores/")
		}
	},

	render: function() {
		this.$el.html(this.template());

		return this;
	},
	/**
	* Cambiar esta estado de los botones de los 2 catalogos, destaca el catalogo de datos
	*/
	setDatos : function() {
		console.log("setDatos");
		$("#catalogoDatos").addClass("btn-primary");
		//$("#catalogoVisualizadores").addClass("btn-default");
		$("#catalogoVisualizadores").removeClass("btn-primary");


		

	},
	/**
	* Cambiar esta estado de los botones de los 2 catalogos, destaca el catalogo de visualizadores
	*/
	setVisualizadores : function() {
		console.log("setVisualizadores");
		$("#catalogoDatos").removeClass("btn-primary");
		//$("#catalogoDatos").addClass("btn-default");
	    $("#catalogoVisualizadores").addClass("btn-primary");

	}

})
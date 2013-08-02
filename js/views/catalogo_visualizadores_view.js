App.views.CatalogoVisualizadoresListView = Backbone.View.extend(
/** @lends CatalogoVisualizadoresListView.prototype */
{	
	/**
	* @class CatalogoVisualizadoresListView Controla los datos  y las vistas relacionadas relacionadas para mostrar los elementos del catalogo
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista (sidebar + catalogo)		* 
	* CatalogoVisualizadoresListView genera el template respectivo
	*/
	initialize : function() {
		this.template = _.template($("#template_CatalogoVisualizadoresListView").html())

		this.sideBarView = new App.views.SideBarView2({collection:this.collection});
		
		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);


		this.render()
	},
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		this.$el.html(this.template());

		this.$el.find(".sidebar").html(this.sideBarView.$el);
		 var $list = this.$el.find(".list.visualizadores");

		 this.collection.each(function(item) {
		 	var itemView = new App.views.CatalogoVisualizadoresCategoriaView({model: item});
		 	
		 	$list.append(itemView.render().$el);
		 })
		

		return this;
	}

})


App.views.CatalogoVisualizadoresCategoriaView = Backbone.View.extend(
/** @lends MainView.prototype */
{
	/** li -  elemento generado por esta vista */
	tagName :"li",
	/**
	* @class CatalogoVisualizadoresCategoriaView Maneja un Item de una catagoria
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.	
	* 
	* CatalogoVisualizadoresCategoriaView genera el template respectivo
	*/
	initialize : function() {
		this.template = _.template($("#template_CatalogoVisualizadoresCategoriaView").html())
		

		this.render()
	},
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		var data = this.model.toJSON();
		
		this.$el.html(this.template(data));


		var $list = this.$el.find(".list.visualizador");

		var graficos = new Backbone.Collection(this.model.get("datos"));
		//console.log(graficos);
		graficos.each(function(item) {
			var añoView = new App.views.CatalogoVisualizadoresItemView({model:item});
			$list.append(añoView.$el);
		})

		return this;
	}

})


App.views.CatalogoVisualizadoresItemView = Backbone.View.extend({
	/** DIV -  elemento generado por esta vista */
	tagName :"div",
	className : "col-lg-2",
	/**
	* @class CatalogoVisualizadoresItemView Maneja un item ( a > img.thumbnails )
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.	
	* CatalogoVisualizadoresItemView genera el template respectivo
	*/
	initialize : function() {
		this.template = _.template($("#template_viewsCatalogoVisualizadoresItemView").html())
		this.render()
	},
	events: {
		"click a.windowIframe": "openIframe"
		
	},
	/**
	* Levanta una ventana Emergente dependiendo del elemento seleccionado( el contenido es una iframe)
	*
	*/
	openIframe: function(e){

		var frameSrc = $(e.target).attr("alt");
		var title = $(e.target).attr("title");
		
		 $('iframe').attr("src",frameSrc);
		 $("#dialog_iframe").text(title);
		
	    $('#myModal').modal({show:true})
	},
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		return this;
	}

})



App.views.CatalogoDatosMainView = Backbone.View.extend(
/** @lends CatalogoDatosListView.prototype */
{	
	/**
	* @class CatalogoDatosListView Maneja lista de Datos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.		* 
	* CatalogoDatosListView genera el template respectivo
	*/
	initialize : function() {
		this.template = _.template($("#template_CatalogoDatosMainView").html())

		this.sideBarView = new App.views.SideBarView({collection:this.collection});

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

		var $list = this.$el.find(".temas");

		 this.collection.each(function(item) {
		 	console.log(item.toJSON());
			var itemView = new App.views.template_CatalogoDatosTemasView({model: item});
			$list.append(itemView.render().$el);
		 })
		

		return this;
	}

})


App.views.template_CatalogoDatosTemasView = Backbone.View.extend(
/** @lends CatalogoDatosItemView.prototype */
{
	/** li -  elemento generado por esta vista */
	tagName :"div",
	className:"tema",
	/**
	* @class CatalogoDatosItemView Maneja un elemento de datos
	*
	* @augments Backbone.View
	* @constructs
	*
	*/
	initialize : function() {
		this.template = _.template($("#template_CatalogoDatosTemasView").html())
		this.render()
	},
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		var data = this.model.toJSON();
		console.log(data);
		this.$el.html(this.template(data));

		var $list = this.$el.find(".item");

		var datosPorItems= new Backbone.Collection(this.model.get("items"));

		datosPorItems.each(function(item) {
			var itemView = new App.views.CatalogoDatosTemaView({model:item});
			$list.append(itemView.$el);
		})

		return this;
	}

})


App.views.CatalogoDatosTemaView = Backbone.View.extend(
/** @lends CatalogoDatosItemView.prototype */
{
	/** tr -  elemento generado por esta vista */
	tagName :"div",
	/**
	* @class CatalogoDatosCategoriaItemView Maneja una fila de datos correspondiente a una catagoria (Ej: año, meses)
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template que maneja las filas de una categoria
	* 
	* CatalogoDatosCategoriaItemView genera el template respectivo
	*/
	initialize : function() {
		this.template = _.template($("#template_CatalogoDatosTemaView").html())
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

		var $list = this.$el.find(".itemTR.table");
	
		 var datosPorFormato = new Backbone.Collection(this.model.get("datos"));
		 datosPorFormato.each(function(item) {
		 	var formatoView = new App.views.CatalogoDatosTRItemView({model:item});
		 	$list.append(formatoView.$el);
		 })

		return this;
	}

})

App.views.CatalogoDatosTRItemView = Backbone.View.extend(
/** @lends CatalogoDatosItemView.prototype */
{
	/** tr -  elemento generado por esta vista */
	tagName :"tr",
	/**
	* @class CatalogoDatosCategoriaItemView Maneja una fila de datos correspondiente a una catagoria (Ej: año, meses)
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template que maneja las filas de una categoria
	* 
	* CatalogoDatosCategoriaItemView genera el template respectivo
	*/
	initialize : function() {
		this.template = _.template($("#template_CatalogoDatosTRItemView").html())
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

		var $list = this.$el.find(".list.formatos");

		var datosPorFormato = new Backbone.Collection(this.model.get("links"));
		datosPorFormato.each(function(item) {
			var formatoView = new App.views.CatalogoDatosFormatoItemView({model:item});
			$list.append(formatoView.$el);
		})

		return this;
	}

})


App.views.CatalogoDatosFormatoItemView = Backbone.View.extend({
	/** DIV -  elemento generado por esta vista */
	tagName :"div",
	className : "col-lg-1",

	/**
	* @class CatalogoDatosFormatoItemView Maneja una fila de datos correspondiente a un formato (ej. xls, csv)
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template donde se añade los los formatos ( XLS; CSV)	
	* 
	* CatalogoDatosFormatoItemView genera el template respectivo
	*/

	initialize : function() {
		this.template = _.template($("#template_CatalogoDatosFormatoItemView").html())
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

		return this;
	}

})


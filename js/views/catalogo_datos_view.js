// VISTAS CATALOGO DATOS
// =====================

// App.views.CatalogoDatosMainView = Backbone.View.extend({
// 	initialize : function() {
// 		App.views.catalogoDatosListViewEdEscolar = new App.views.CatalogoDatosListView({collection:App.collections.coleccionDatosEdEscolar});
// 		App.views.catalogoDatosListViewEdSuperior = new App.views.CatalogoDatosListView({collection:App.collections.coleccionDatosEdSuperior});
// 		App.views.catalogoDatosListViewEdParvularia = new App.views.CatalogoDatosListView({collection:App.collections.coleccionDatosEdParvularia});
// 		// App.views.catalogoVisualizadoresListView = new App.views.CatalogoVisualizadoresListView({collection:App.collections.coleccionVisualizadores});
// 	}

// });




/**
* Maneja lista de Datos
*/
App.views.CatalogoDatosListView = Backbone.View.extend({
	initialize : function() {
		console.log("CatalogoDatosListView");
		this.template = _.template($("#template_CatalogoDatosListView").html())

		this.sideBarView = new App.views.SideBarView({collection:this.collection});

		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);

		this.render()
	},

	render: function() {

		this.$el.html(this.template());

		this.$el.find(".sidebar").html(this.sideBarView.$el);

		var $list = this.$el.find(".list.datos");

		this.collection.each(function(item) {
			var itemView = new App.views.CatalogoDatosItemView({model: item});
			$list.append(itemView.render().$el);
		})
		

		return this;
	}

})

/**
* Maneja un elemento de datos
*/
App.views.CatalogoDatosItemView = Backbone.View.extend({
	tagName :"li",

	initialize : function() {
		this.template = _.template($("#template_CatalogoDatosItemView").html())
		this.render()
	},

	render: function() {
		var data = this.model.toJSON();
		console.log(data);
		this.$el.html(this.template(data));

		var $list = this.$el.find(".list.años");

		var datosPorAño = new Backbone.Collection(this.model.get("datos"));

		datosPorAño.each(function(item) {
			var añoView = new App.views.CatalogoDatosCategoriaItemView({model:item});
			$list.append(añoView.$el);
		})

		return this;
	}

})

/**
* Maneja una fila de datos correspondiente a un año
*/
//cambiar por catego
App.views.CatalogoDatosCategoriaItemView = Backbone.View.extend({
	tagName :"tr",

	initialize : function() {
		this.template = _.template($("#template_CatalogoDatosCategoriaItemView").html())
		this.render()
	},

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

/**
* Maneja una fila de datos correspondiente a un formato (ej. xls, csv)
*/
App.views.CatalogoDatosFormatoItemView = Backbone.View.extend({
	tagName :"div",
	className : "col-lg-1",

	initialize : function() {
		this.template = _.template($("#template_CatalogoDatosFormatoItemView").html())
		this.render()
	},

	render: function() {
		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		return this;
	}

})


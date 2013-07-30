window.App = {
	models : {},
	collections : {},
	views : {}
}


$().ready(function() {
	App.views.menuSeccionesView = new App.views.MenuSeccionesView();
	$("div.menu.secciones").html(App.views.menuSeccionesView.$el);

	App.collections.coleccionDatos = new App.collections.ColeccionDatos();
	App.collections.coleccionDatos.fetch();

	App.views.catalogoDatosListView = new App.views.CatalogoDatosListView({collection:App.collections.coleccionDatos});
	$("div.subseccion.educacion_escolar").html(App.views.catalogoDatosListView.$el);
});


// VISTAS
// ======

/**
* Maneja contenido de menu de secciones
*/
App.views.MenuSeccionesView = Backbone.View.extend({
	initialize : function() {
		this.template = _.template($("#template_menu_secciones").html())

		this.render()
	},

	render: function() {
		this.$el.html(this.template());

		return this;
	}

})

/**
* Maneja lista de Datos
*/
App.views.CatalogoDatosListView = Backbone.View.extend({
	initialize : function() {
		this.template = _.template($("#template_catalogo_datos_lista").html())

		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);

		this.render()
	},

	render: function() {

		this.$el.html(this.template());

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
		this.template = _.template($("#template_catalogo_datos_item").html())
		this.render()
	},

	render: function() {
		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		var $list = this.$el.find(".list.años");

		var datosPorAño = new Backbone.Collection(this.model.get("datos"));

		datosPorAño.each(function(item) {
			var añoView = new App.views.CatalogoDatosAñoView({model:item});
			$list.append(añoView.$el);
		})

		return this;
	}

})

/**
* Maneja una fila de datos correspondiente a un año
*/
App.views.CatalogoDatosAñoView = Backbone.View.extend({
	tagName :"tr",

	initialize : function() {
		this.template = _.template($("#template_catalogo_datos_año_item").html())
		this.render()
	},

	render: function() {
		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		var $list = this.$el.find(".list.formatos");

		var datosPorFormato = new Backbone.Collection(this.model.get("links"));
		datosPorFormato.each(function(item) {
			var formatoView = new App.views.CatalogoDatosFormatoView({model:item});
			$list.append(formatoView.$el);
		})

		return this;
	}

})

/**
* Maneja una fila de datos correspondiente a un formato (ej. xls, csv)
*/
App.views.CatalogoDatosFormatoView = Backbone.View.extend({
	tagName :"li",

	initialize : function() {
		this.template = _.template($("#template_catalogo_datos_formato_item").html())
		this.render()
	},

	render: function() {
		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		return this;
	}

})
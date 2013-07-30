// VISTAS CATALOGO VISUALIZADORES
// =====================

/**
* Maneja lista de Datos
*/

App.views.CatalogoVisualizadoresListView = Backbone.View.extend({
	initialize : function() {
		this.template = _.template($("#template_CatalogoVisualizadoresListView").html())

		this.sideBarView = new App.views.SideBarView({collection:this.collection});
		
		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);


		this.render()
	},

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

/**
* Maneja un elemento de datos
*/
App.views.CatalogoVisualizadoresCategoriaView = Backbone.View.extend({
	tagName :"li",

	initialize : function() {
		this.template = _.template($("#template_CatalogoVisualizadoresCategoriaView").html())
		

		this.render()
	},

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

/**
* Maneja una fila de datos correspondiente a un año
*/
App.views.CatalogoVisualizadoresItemView = Backbone.View.extend({
	tagName :"div",
	className : "col-lg-2",

	initialize : function() {
		this.template = _.template($("#template_viewsCatalogoVisualizadoresItemView").html())
		this.render()
	},
	events: {
		"click a.windowIframe": "openIframe"
		
	},
	openIframe: function(e){

		var frameSrc = $(e.target).attr("alt");
		var title = $(e.target).attr("title");
		
		 $('iframe').attr("src",frameSrc);
		 $("#dialog_iframe").text(title);
		
	    $('#myModal').modal({show:true})
	},

	render: function() {
		var data = this.model.toJSON();
		this.$el.html(this.template(data));

		return this;
	}

})

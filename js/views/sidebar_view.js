
/**
* Maneja contenido del SIDEDAR CATALOGO DATOS
*/
App.views.SideBarView = Backbone.View.extend(
/** @lends MenuSeccionesView.prototype */
{
	
	/**
	* @class SideBarView Controla datos y vistas relacionadas con los 2 catalogos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.		* 
	* SideBarView genera el template respectivo
	*/
	events: {
		  "click  a": "select"
	},
	initialize : function() {
		this.template = _.template($("#template_SideBarView").html())
		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);
	
	},
	
	select:function(e){
			$("a.activo").removeClass("activo");
			$(e.target).addClass("activo")
	},

	render: function() { 
		var data= {}
		data.tab = this.options.tab
		this.$el.html(this.template(data));
		var $list = this.$el.find(".accordion");

		this.collection.each(function(item) {
			var itemView = new App.views.SideBarItemView({model: item,tab:data.tab});
			$list.append(itemView.render().$el);
		})

		return this;
	}

})

App.views.SideBarItemView = Backbone.View.extend({
	/** li -  elemento generado por esta vista */
	tagName :"div",
	className:"accordion-group",
	/**
	* @class SideBarView Controla datos y vistas relacionadas con los 2 catalogos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.		* 
	* SideBarView genera el template respectivo
	*/
	initialize : function() {
		//console.log("SideBarItemView ::::" +this.options.tab);
		
		this.template = _.template($("#template_SideBarItemView").html())
		this.render()
	},
	events: {
	},
	
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		var data = this.model.toJSON();
		//data.slug = this.make_slug(data.tema);
		data.slug = App.utils.make_slug(data.tema);
		data.tab = this.options.tab
		data.count =this.model.get("items").length;
		//console.log(data);
		this.$el.html(this.template(data));
		//console.log();
		var datosPorItems= new Backbone.Collection(this.model.get("items"));
		var $list = this.$el.find(".nav");
		datosPorItems.each(function(item) {
			//console.log(item.toJSON());
			var itemView = new App.views.SideBarTemaView({model:item});
			$list.append(itemView.$el);
		})
		return this;
	}

})

App.views.SideBarTemaView = Backbone.View.extend(
/** @lends CatalogoDatosItemView.prototype */
{
	/** tr -  elemento generado por esta vista */
	tagName :"li",
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
		this.template = _.template($("#template_SideBarTemaView").html())
		this.render()
	},
	events: {
		  //'click':'doSomething'
	},
	
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		var data = this.model.toJSON();
		data.slug =  App.utils.make_slug(data.titulo);
		//console.log(data);
		this.$el.html(this.template(data));

		
		return this;
	}

})

//=================================================
//CATALOGO DE VISUALIZADORES

App.views.SideBarViewViz = Backbone.View.extend(
/** @lends MenuSeccionesView.prototype */
{
	/**
	* @class SideBarView Controla datos y vistas relacionadas con los 2 catalogos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.		* 
	* SideBarView genera el template respectivo
	*/
	initialize : function() {
		console.log("SideBarView");
		this.template = _.template($("#template_SideBarViewViz").html())
		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);

		this.render()
	},

	render: function() {

		this.$el.html(this.template());
		var $list = this.$el.find(".bs-sidenav");

		this.collection.each(function(item) {
			var itemView = new App.views.SideBarItemViewViz({model: item});
			$list.append(itemView.render().$el);
		})

		return this;
	}

})

App.views.SideBarItemViewViz = Backbone.View.extend({
	/** li -  elemento generado por esta vista */
	tagName :"li",
	/**
	* @class SideBarView Controla datos y vistas relacionadas con los 2 catalogos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.		* 
	* SideBarView genera el template respectivo
	*/
	initialize : function() {
		console.log("SideBarItemViewViz");

		this.template = _.template($("#template_SideBarItemViewViz").html())
		this.render()
	},
	events: {
		  //'click':'doSomething'
		  "click  a": "doSomething"

	},
	doSomething: function(){

		console.log("doSomething");
	},

	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		var data = this.model.toJSON();
		data.slug = App.utils.make_slug(data.titulo);
		data.count = "2";
		this.$el.html(this.template(data));

		var $list = this.$el.find(".bs-sidenav");

		return this;
}

})
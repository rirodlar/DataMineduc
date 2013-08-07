
/**
* Maneja contenido del SIDEDAR CATALOGO DATOS
*/
App.views.SideBarView = Backbone.View.extend(
/** @lends MenuSeccionesView.prototype */
{
	className:"bs-sidebar",
	/**
	* @class SideBarView Controla datos y vistas relacionadas con los 2 catalogos
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.		* 
	* SideBarView genera el template respectivo
	*/
	events: {
		  "click  a": "doSomething1"
	},
	initialize : function() {
		//console.log("SideBarView");
		this.template = _.template($("#template_SideBarView").html())
		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);

		this.render()
	},
	doSomething1: function(e){
		//var item = $(e.target).attr("href");
		var value = $(e.target).parent().children().length
		var $element = $(e.target).parent().children().next()
		if(value > 1){
			if ($element.is(':hidden')){
			 	$element.show("slow")
			}
			else{
				$element.hide("slow")
			}
		}

		//alert("doSomething1");
		//console.log(item);
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
		//console.log("SideBarItemView");
		
		this.template = _.template($("#template_SideBarItemView").html())
		this.render()
	},
	events: {
		  "click  a": "activarLI"
	},
	activarLI: function(e){
		
		var item = $(e.target).attr("href");
		$("ul.bs-sidenav li").removeClass("active")
		$(e.target).parent().addClass("active")
		
	},
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		var data = this.model.toJSON();
		data.slug = this.make_slug(data.tema);
		//console.log(data);
		this.$el.html(this.template(data));

		var datosPorItems= new Backbone.Collection(this.model.get("items"));
		var $list = this.$el.find(".nav");
		datosPorItems.each(function(item) {
			//console.log(item.toJSON());
			var itemView = new App.views.SideBarTemaView({model:item});
			$list.append(itemView.$el);
		})
		return this;
	},
	make_slug:function(str){
	    str = str.toLowerCase();
	    str = str.replace(/[^a-z0-9]+/g, '-');
	    str = str.replace(/^-|-$/g, '');
	    return str;
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
		  "click  a": "doSomething3"
		
	},
	doSomething3: function(){
		//alert("doSomething3");
		console.log("doSomething3");
	},
	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render: function() {
		var data = this.model.toJSON();
		data.slug = this.make_slug(data.titulo);
		//console.log(data);
		this.$el.html(this.template(data));

		
		return this;
	},
	make_slug:function(str){
	    str = str.toLowerCase();
	    str = str.replace(/[^a-z0-9]+/g, '-');
	    str = str.replace(/^-|-$/g, '');
	    return str;
	}


})

//=================================================
//CATALOGO DE VISUALIZADORES

App.views.SideBarView2 = Backbone.View.extend(
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
		this.template = _.template($("#template_SideBarView2").html())
		this.listenTo(this.collection, "change", this.render);
		this.listenTo(this.collection, "sync", this.render);

		this.render()
	},

	render: function() {

		this.$el.html(this.template());
		var $list = this.$el.find(".bs-sidenav");

		this.collection.each(function(item) {
			var itemView = new App.views.SideBarItemView2({model: item});
			$list.append(itemView.render().$el);
		})

		return this;
	}

})

App.views.SideBarItemView2 = Backbone.View.extend({
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
		console.log("SideBarItemView2");

		this.template = _.template($("#template_SideBarItemView2").html())
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

		this.$el.html(this.template(data));

		var $list = this.$el.find(".bs-sidenav");

		return this;
}

})



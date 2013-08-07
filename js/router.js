App.Router = Backbone.Router.extend(
    /** @lends Router */
    {
    /**
    * @class Router Manejo de rutas (urls)
    *
    * @augments Backbone.Router
    * @constructs
    *
    */
    initilize: function() {
    },

    routes: {
        "": "catalogoDatos",
        "datos": "catalogoDatos",
        "visualizadores": "catalogoVisualizadores"
     
    },
    /** 
    * Muestra el catalogo de datos
    */
    catalogoDatos: function () {
      // App.views.mainView.showCatalogoDatos();
	 	
    },
    /** 
    * Muestra el catalogo de visualizadores
    */
     catalogoVisualizadores: function () {
        App.views.mainView.showCatalogoVisualizadores();
    }
})
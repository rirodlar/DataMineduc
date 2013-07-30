App.Router = Backbone.Router.extend({
    routes: {
        "": "catalogoDatos",
        "datos": "catalogoDatos",
        "visualizadores": "catalogoVisualizadores"
     
    },

    catalogoDatos: function () {
       App.views.mainView.showCatalogoDatos();
	 	
    },
     catalogoVisualizadores: function () {
        App.views.mainView.showCatalogoVisualizadores();
    }
})
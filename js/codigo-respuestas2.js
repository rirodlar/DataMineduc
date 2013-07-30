/**
* @namespace 
* @property {object} collections - Colecciones de entidades (Clases e instancias).	
* @property {object} models - Colecciones de entidades (Clases e instancias).	
* @property {object} views - Colecciones de entidades (Clases e instancias).	
* @property {object} views.sessionManager - Manejador de sesiones.	
* @property {object} views.mainView - Controlador proncipal de las vistas y datos.	
* @property {object} router - Manejador de rutas - urls.	
* @property {object} mainRef - Referencia principal al almacenamiento de datos de Firebase.	
* @property {object} participant_id - Identificador del participante.	
*/
window.App = {
	collections : {},
	models : {},
	views : {}
}

$(function () {
	App.participant_id = null;

	App.mainRef = new Firebase('https://education.firebaseio.com/udla');
	App.views.sessionManager = new App.views.SessionManagementView();

	App.views.mainView = new App.views.MainView();
	$("div.container").html(App.views.mainView.$el);

	App.router = new App.Router;
	Backbone.history.start();

});



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
	":code":                "quiz",    // #Goes to a specific quiz
	},

	/** 
	* Muestra un quiz asociado al código dado
	* @param {string} code Código del quiz asociado
	*/
	quiz: function(code) {
		App.views.mainView.showQuiz(code);
	}

});


App.views.SessionManagementView = Backbone.View.extend(
	/** @lends SessionManagementView.prototype */
	{

	/**
	* @class SessionManagementView controla la sesion y los datos de un participante
	*
	* @augments Backbone.View
	* @constructs
	*
	* SessionManagementView Verifica que exista identificador de participante en cookies (easyq_participant) y gestiona control de presencia
	*/
	initialize : function() {
		/**
		* @type {SessionManagementView}
		*/
		var self = this;  //Utilizado para hacer referencia contexto "this"a, interior de funciones llamadas via callback
		
		// Si se ha almacenado una cookie con el id del participante, generar una referencia en la lista de participantes
		if ($.cookie("easyq_participant")) {
			App.participant_id = $.cookie("easyq_participant");
			this.participantRef = App.mainRef.child("participant").child(App.participant_id);
		} 

		// Si no se encuentra cookie de participante, generar un nuevo id y almacenarlo como cookie
		else {
			this.participantRef = App.mainRef.child("participant").push();
			App.participant_id = this.participantRef.name();
			$.cookie("easyq_participant", App.participant_id)
		}

		// Configurar referencia de presencia que permita detectar cuando el usuario se desconecte
		// Se configura para eliminar de lista de participantes al desconectarse
		var presenceRef = new Firebase("https://education.firebaseio.com/.info/connected");
		presenceRef.on("value", function(snap) {
		  if (snap.val()) {
		    self.participantRef.set(true);
		    // Eliminar de lista de participantes al desconectarse.
		    self.participantRef.onDisconnect().remove();
		  }
		});

		// Monitorea el número de participantes conectados.
		App.mainRef.child("participant").on("value", function(snap) {
		  console.log("# of online users = " + snap.numChildren());
		}); 

	}, 


	/**
	* Presenta información en elemento respectivo ($el)
	* @fires SessionManagementView#prueba
	* @returns {View} Esta vista
	*/
	render: function() {
		// Se almacena el id de participante por si la aplicación desea utilizarlo
		$el.html(App.participant_id);

		/**
		 * Evento de prueba indicando un participante.
		 *
		 * @event SessionManagementView#prueba
		 * @type {string}
		 */
       	this.trigger('prueba', App.participant_id);

		return this;
	}
});


App.views.MainView = Backbone.View.extend(
/** @lends MainView.prototype */
{
	/**
	* @class MainView Controla datos y vistas relacionadas con el quiz seleccionado por el participante
	*
	* @augments Backbone.View
	* @constructs
	* @property {String} this.template - Template principal de la vista.	
	* @property {String} this.quizSession - Modelo con datos de la sesión de preguntas .	
	* 
	* MainView genera el template respectivo
	*/
	initialize : function() {
		this.template = _.template($("#template_MainView").html())
	},

	/** DIV -  elemento generado por esta vista */
	tagName: "div",

	/**
	* Selecciona un nuevo quiz para desplegar, basado en el código de session (code)
	*
	* @param {string} code Código asociado a una sesión de un Quiz
	*/
	showQuiz: function(code) {
		/** Referencia a esta vista (this) para ser utilizada en callback functions (que no tienen vinculado el contexto de la vista)*/
		var self = this;

		this.quizSession = new App.models.QuizSession(null, {firebase: App.mainRef.child("quizsession").child(code)});

		this.listenTo(this.quizSession, "change", function(d) {
			var user_id = this.quizSession.get("user");
			var quiz_id = this.quizSession.get("quiz");
			self.state = this.quizSession.get("state");

			self.model = new Backbone.Firebase.Model(null, {
				firebase: App.mainRef.child("users").child(user_id).child("quiz").child(quiz_id)
			});

			self.listenTo(self.model, "change", self.render)
		});
		
	},

	/**
	* Presenta información en elemento respectivo ($el)
	*
	* @returns {View} Esta vista
	*/
	render : function() {
		var self = this;
		this.$el.html(this.template());

		var $panel = this.$el.find(".panel");

		$panel.append(this.model.get("title"));

		this.questions = new Backbone.Collection(_.toArray(this.model.get("question")));

		this.questions.each(function(item) {
			$panel.append("<li>"+item.get("title"));
		});

	}
});








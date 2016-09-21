/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
	  	name:{
	  		type:'string',
	      required: true

	  	},
	    lastname:{
	      type:'string',
	      required: true
	    },
	  	password:{
	  	type:'string',
	      required: true
	  	},
	  	email:{
	  		type:'email',
	  		unique: true,
	        required: true

	  	},
	  	admin:{
	   		type:'boolean',
	   		defaultsTo: false
	  	},
	  	image:{
	   		type:'string'
	  	},
	  	phone:{
	  		type: 'string',
	  		unique: true,
	  		defaultsTo: '569-xxxxxxx'
	  	},
	  	adress:{
	  		type: 'string',
	  		defaultsTo: 'Sin ingresar'
	  	},
			tokens:{
				type: 'int',
				defaultsTo : '3'
			},
			id_group:{
				type: 'string'
			},
			anuncios:{
				collection: 'anuncios',
				via: 'user',
			},
			groups:{
				collection: 'Group',
				via: 'users',
				dominant: true
			},
	  	toJSON: function(){
		 		var obj= this.toObject();
		  	delete obj.password;
		  	delete obj._csrf;
		  	return obj;
  		}

    },
      beforeCreate: function (values, next) {

	    /*if (!values.password || values.password != values.passwordc) {
	    	var passwordError = [{
	    		name: 'passwordError',
	    		message: 'Las contraseñas ingresadas no coinciden'
	    	}]
	    	return next({ err: passwordError});

	    }

	    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, passworden) {
	      if (err) return next(err);
	      values.passworden = passworden;
	      next();
	    }); */
			next();
	  }


};

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	schema: true,
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
	  	passwordc:{
	  	type:'string',
	      required: true
	  		 
	  	},
	  	passworden:{
	  	  type:'string',
	  		 
	  	},
	  	email:{
	  		type:'email',
	  		unique: true,
	        required: true
	  		
	  	},
	  	tipo:{
	   		type:'string'
	  		
	  	},
	  	image:{
	   		type:'string' 
	  	},
	  	 toJSON: function(){
		 	var obj= this.toObject();
		  	delete obj.password;
		  	delete obj.passwordc;
		  	delete obj._csrf;
		  	return obj;
  		}

    },
      beforeCreate: function (values, next) {

	    if (!values.password || values.password != values.passwordc) {
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
	    });
	  }	


};


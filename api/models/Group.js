/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	nombre:{
  		type:'string',
  		required: true

  	},
  	descripcion:{
  		type:'text',
  		required: true

  	},
  	image:{
   		type:'string'
  		
  		
  	},
  	id_group_user:{
  		type:'integer'

  	},
  	color:{
  		type:'string',
  		required: true
  	},
  	start:{
  		type:'datetime'

  	},
  	end:{
  		type:'datetime'

  	}

  }
};


/**
 * Anuncios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/

module.exports = {

  attributes: {

  	text:{
  		type:'mediumtext',
  		required: true
  	},
  	estado:{
  		type:'string',
  		required: true
  	},
  	id_group:{
  		type:'string'
  	},
    autor:{
      model: 'user'
    }

  }
};

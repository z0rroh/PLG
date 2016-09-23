/**
 * Group.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name:{
  		type: 'string',
  		required: true

  	},
  	description:{
  		type: 'text',
  		required: true

  	},
    ubication:{
      type: 'string',
      required: true
    },
  	image:{
   		type: 'string'
  	},
    group_parent:{
      type: 'string'
    },
    users:{
      collection: 'user',
      via: 'groups'
    },
    anuncios:{
      collection: 'anuncio',
      via: 'group'
    }
  }
};

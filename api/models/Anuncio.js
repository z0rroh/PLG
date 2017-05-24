/**
 * Anuncios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
*/
var moment=require('moment');
module.exports = {

  attributes: {

  	text:{
  		type:'mediumtext',
  		required: true
  	},
  	group:{
  		model: 'group'
  	},
    autor:{
      model: 'user'
    },
    comment:{
      collection: 'comentario',
      via: 'anuncio',
    },

  },
  anunciosFindByGroup: function (options, cb) {
     Anuncio.find({group:options}).populate('autor').populate('comment').sort({ createdAt: 'desc' }).exec(function (err, anuncios) {
       if (err) return cb(err);
       if (!anuncios) return cb(new Error('Anuncios not found.'));
       return cb(null,anuncios);
     });
   },

   afterCreate: function (options, cb) {
      Anuncio.find({id:options.id}).populate('autor').populate('comment').exec(function (err, anuncio) {
        if (err) return cb(err);
        if (!anuncio) return cb(new Error('Anuncios not found.'));
        Anuncio.publishCreate(anuncio);
        cb();
      });
    }

};

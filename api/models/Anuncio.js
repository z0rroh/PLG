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

   anuncioFindByGroup: function (options, cb) {
      Anuncio.findOne({id:options.id}).populate('autor').populate('comment').exec(function (err, anuncio) {
        if (err) return cb(err);
        if (!anuncio) return cb(new Error('Anuncios not found.'));
        moment.locale('es');
        var dia = anuncio.createdAt.getDate();
        var mes = anuncio.createdAt.getMonth();
        var año = anuncio.createdAt.getFullYear();
        var hora = anuncio.createdAt.getHours();
        var min = anuncio.createdAt.getMinutes();
        var seg = anuncio.createdAt.getSeconds();
        var now = moment([año,mes,dia,hora,min,seg]).fromNow();
        var comments = [];
        var newAnuncio = {
          autor: anuncio.autor.name,
          id: anuncio.id,
          text: anuncio.text,
          comment: comments,
          fecha: now
        }
        Anuncio.publishCreate(newAnuncio);
        cb(null,newAnuncio);
      });
    }

};

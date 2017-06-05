/**
 * Comentario.js
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
    autor:{
      model: 'user'
    },
    anuncio:{
      model: 'anuncio'
    },

  },
  comentarioFindByGroup: function (options, cb) {
     Comentario.findOne({id:options.id}, function (err, comentario) {
       if (err) return cb(err);
       if (!comentario) return cb(new Error('Comentario not found.'));
       moment.locale('es');
       var dia = comentario.createdAt.getDate();
       var mes = comentario.createdAt.getMonth();
       var año = comentario.createdAt.getFullYear();
       var hora = comentario.createdAt.getHours();
       var min = comentario.createdAt.getMinutes();
       var seg = comentario.createdAt.getSeconds();
       var now = moment([año,mes,dia,hora,min,seg]).fromNow();
       var comments = [];
       var newComment = {
         autor: comentario.autor,
         id: comentario.id,
         text: comentario.text,
         anuncio: comentario.anuncio,
         fecha: now
       }
       Comentario.publishCreate(newComment);
       cb(null,newComment);
     });
   }
};

/**
 * Turnos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var moment = require('moment');
module.exports = {

  attributes: {
    name:{
      type:'string',
      required: true
    },
    start:{
      type:'string',
      required: true
    },
    end:{
      type:'string',
      required: true
    },
    day:{
      type: 'string',
      required: true
    },
    cupoTotal:{
      type: 'int'
    },
    cupoActual:{
      type: 'int',
      defaultsTo: '0'
    },
    estado:{
      type: 'string',
      required: true
    },
    expiracion:{
      type: 'string'
    },
    group: {
      type: 'string',
      required: true
    },
    users:{
      type:'array'
    },
    id_turno:{
      type:'string',
      required: true
    }
  },
  expiracion: function(start,cb){
      var now = moment().format();
      var monto = '';
      var salida = '';
      if(now.format('d') >= turno){
        monto = now.format('d')-turno;
        salida = now.subtract(monto,'d');
        salida = salida.add(1,'week');
        console.log(salida.format());
      }
      else{
        monto = turno - now.format('d');
        salida = now.add(monto,"d");
        console.log(salida.format());
      }
      return cb();
    },

};

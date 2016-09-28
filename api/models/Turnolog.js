/**
 * Turnos.js
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
      type: 'boolean'
    },
    group: {
      type: 'string',
      required: true
    },
    users:{
      type:'array'
    }
  }
};

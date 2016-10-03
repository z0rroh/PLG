/**
 * TurnosController
 *
 * @description :: Server-side logic for managing turnos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function (req, res){
	//console.log("pagina de registro");
	res.view('turnos/new');
	//req.session.flas={};

	},
	create: function(req, res,next){
		var params = req.params.all();
		var turnosObj=[]
		for( var property in params){
  		if(params[property] === 'on'){
				auxObj= {
				  start: req.param('start'),
				  end : req.param('end'),
				  name: req.param('name'),
				  cupo: req.param('cupos'),
					day: property,
					group: req.session.User.id_group,
				}
				turnosObj.push(auxObj);
			}
		}
		if (turnosObj.length == 0){
				var noTurn=[{message: 'Debes seleccionar almenos un dia para crear un turno'}]
				req.session.flash={
						err: noTurn
				}
				res.redirect('/admin');
		}
		else{
				Turno.create(turnosObj).exec(function(err, created){
				res.redirect('/admin');
			});
		}

	},

	show: function(req, res, next){
	},

	index: function(req, res, next){
		Turno.find({group:req.session.User.id_group},function foundUsers(err, turnos){
			if(err) return next();
			var ln = [];
			var mr = [];
			var mier = [];
			var jv = [];
			var vr = [];
			var sb = [];
			var dg = [];
			turnos.map(function(turno){
				if(turno.day === 'ln')
					ln.push(turno)
				if(turno.day === 'mr')
					mr.push(turno)
				if(turno.day === 'mier')
					mier.push(turno)
				if(turno.day === 'jv')
					jv.push(turno)
				if(turno.day === 'vr')
					vr.push(turno)
				if(turno.day === 'sb')
					sb.push(turno)
				if(turno.day === 'dg')
					dg.push(turno)
			})
			res.view('turnos/index',{
				ln: ln,
				mr: mr,
				mier: mier,
				jv: jv,
				vr: vr,
				sb: sb,
				dg: dg
			});

		});
	},

	edit: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if(err) return next(err);
			if(!user) return next(err);
			res.view({
				user: user
			});
		});
	},

	update: function(req, res, next){
		User.update(req.param('id'), req.params.all(), function userUpdate(err){
			if(err) {
				return res.redirect('user/edit/' + req.param('id'));
			}
			res.redirect('/group/show');
		});
	},

	destroy: function(req, res, next){
		Turno.destroy(req.param('id'), function userDestroy(err){
			if(err){
				return next(err);
			}
			res.redirect('/admin');
		});
	},
	populateTurnolog: function(req,res,next){
		Turno.find({group: req.session.User.id_group},function(err,turnos){
			if(err){
				var noTurn=[{message: 'no hay turnos registrados'}]
				req.session.flash={
						err: noTurn
				}
				res.redirect('/admin');
			}
			if(turnos){
				for(var i in turnos){
					var turnologObj={
				   name: turnos[i].name,
				   start: turnos[i].start,
				   end: turnos[i].end,
				   day: turnos[i].day,
				   cupoTotal: turnos[i].cupo,
					 cupoActual: 0,
				   estado: 'activo',
				   group: req.session.User.id_group,
				   id_turno: turnos[i].id,
				  }
					Turnolog.findOrCreate({id_turno: turnos[i].id, estado: 'activo'},turnologObj,function (err,turnologs) {
						if(err){

						}

					});
				}
				res.redirect('/admin');
			}
		});
	},
};

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
		console.log(req.session.User);
		var turnoObj={
			name: req.param('name'),
			start: req.param('start'),
			end: req.param('end'),
			day: req.param('day'),
			group: req.session.User.id_group
		}
		//console.log(anuncioObj);
		Turno.create(turnoObj,function (err, turno) {

			if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('turnos/new');
			}
			//console.log("se creo bien el anuncio");


			res.redirect('turnos/new');

		});

	},

	show: function(req, res, next){
		Turno.findOne(req.param('id'), function userFounded(err, user){
			if(err) return next(err);
			if(!user) return next(err);
			res.json(user);
		});
	},

	index: function(req, res, next){
		console.log(req.session.User.id_group);
		Turno.find(req.param(req.session.User.id_group),function foundUsers(err, turnos){
			if(err) return next();
			console.log(turnos);
			res.view({
				turnos: turnos
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
		console.log(req.params.all());
		User.update(req.param('id'), req.params.all(), function userUpdate(err){
			if(err) {
				return res.redirect('user/edit/' + req.param('id'));
			}
			res.redirect('/group/show');
		});
	},

	destroy: function(req, res, next){
		User.destroy(req.param('id'), function userDestroy(err){
			if(err){
				return next(err);
			}
			res.redirect('/group/show');
		});
	}
};

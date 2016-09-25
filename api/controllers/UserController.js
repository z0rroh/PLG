/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {

    new:function (req, res){
		//console.log("pagina de registro");
		//res.locals.flash=._clone(req.session.flash);
		res.view('user/new');
		//req.session.flas={};

	},

	create: function(req, res,next){
    User.Validate(req.param('email'),function(response){
      if(!response){
        var NoValidate =[{message: 'El email ya está registrado'}]
  			req.session.flash={
  				err: NoValidate
  			}
        return res.redirect('user/new')
      }
      var userObj={
  			name : req.param('name'),
  			email : req.param('email'),
        password: req.param('password'),
  		}
  		User.create(userObj,function (err, user) {

  			if(err){
  				req.session.flash={
  					err:err
  				}
  				return res.redirect('user/new');
  			}

  			req.session.authenticated = true;
  			req.session.User = user;

  			res.redirect('user/show/'+user.id);

  		});
    });

	},

	show: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if(err) return next(err);
			if(!user) return next(err);
			res.view({
				user: user
			});
		});
	},

	index: function(req, res, next){
		User.find(function foundUsers(err, users){
			if(err) return next();
			res.json({
				users
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
			res.redirect('group/show');
		});
	},

	destroy: function(req, res, next){
		User.destroy(req.param('id'), function userDestroy(err){
			if(err){
				console.log(err);
				return next(err);
			}
			res.redirect('group/index');
		});
	},

	associateGroup: function(req, res, next) {
      Group.find(function foundGroups(err, Groups) {
        if (err) return next(err);
        res.view({
          groups: groups,
          user_id: req.param('id')
        });
      });
    },
  addGroup: function(req,res){
    Group.findGroupByKey(req.param('key'),function(err,group){
      if(err){
        req.session.flash={
          err:err
        }
        return res.view('user/group');
      }
      User.findOne({id:req.session.User.id})
        .then(function(result){
          var user = result;
          user.id_group = group.id;
          user.groups.add(group.id);
          console.log(user);
          user.save(
            function(err){
              console.log('User with ID '+user.id+' now has groud '+user.id_group);
            });
            return res.view('anuncio/index')
        })
        .fail(function(err){
          console.log(err);
          req.session.flash={
            err:err
          }
          return res.view('user/group');
        });
    });
	}


};

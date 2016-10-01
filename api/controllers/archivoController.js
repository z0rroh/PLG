/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	upload: function  (req, res) {
		if(req.method === 'GET')
		return res.json({'status':'GET not allowed'});

		sails.log.debug('We have entered the uploading process ');

		req.file('userPhoto').upload({
		dirname:'../../assets/images/avatars'},function(err,files){
		sails.log.debug('file is :: ', +files);
		maxBytes: 10000000;
		if (err) return res.serverError(err);
		console.log(files);
		 res.json({status:200,file:files});
		});
	}
};

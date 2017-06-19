/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function (req,res){

		res.writeHead(200, {'content-type': 'text/html'});
		res.end(
		'<form action="/archivo/upload" enctype="multipart/form-data" method="post">'+
		'<input type="file" name="avatar" accept=".png, .jpg, .jpeg"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'
		)
	},
	upload: function  (req, res) {
		if(req.method === 'GET')
			return res.json({'status':'GET not allowed'});

		sails.log.debug('We have entered the uploading process ');

	 console.log("holaaaa");
	 req.file('avatar').upload({
	  dirname: '../../assets/images/avatars'
		},function (err, uploadedFiles) {
		  if (err) return res.negotiate(err);
			console.log(uploadedFiles)
		  //return res.json({
		    //message: uploadedFiles.length + ' file(s) uploaded successfully!'
		  //});
		});
		res.redirect('/perfil');
	}
};

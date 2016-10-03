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
		'<form action="http://localhost:1337/archivo/upload" enctype="multipart/form-data" method="post">'+
		'<input type="text" name="title"><br>'+
		'<input type="file" name="avatar" multiple="multiple"><br>'+
		'<input type="submit" value="Upload">'+
		'</form>'
		)
	},
	upload: function  (req, res) {
		/*if(req.method === 'GET')
		return res.json({'status':'GET not allowed'});

		sails.log.debug('We have entered the uploading process ');

		req.file('userPhoto').upload({
		dirname:'../../assets/images/avatars'},function(err,files){
		sails.log.debug('file is :: ', +files);
		maxBytes: 10000000;
		if (err) return res.serverError(err);
		console.log(files);
		 res.json({status:200,file:files});
	 });*/
	 console.log("holaaaa");
	 req.file('avatar').upload({
	  dirname: '../../assets/images/avatars'
		},function (err, uploadedFiles) {
		  if (err) return res.negotiate(err);
		  return res.json({
		    message: uploadedFiles.length + ' file(s) uploaded successfully!'
		  });
		});
		res.redirect('archivo/index');
	}
};

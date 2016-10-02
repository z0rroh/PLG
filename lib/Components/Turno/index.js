
io.socket.on('Turnolog', function(event){console.log(event)});
io.socket.get('/turnolog/entrar',function(resData, jwres){

  $.each(resData, function(i, item) {
    console.log(item[i]);
  });
});


/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('company', { title: 'Express' });
};